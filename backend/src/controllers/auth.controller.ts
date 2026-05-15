import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import db from "../config/db";
import generateToken from "../utils/generateToken";

// ==========================
// REGISTER USER
// ==========================
export const registerUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check if user already exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results: any) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
          });
        }

        if (results.length > 0) {
          return res.status(400).json({
            message: "User already exists",
          });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
          password,
          10
        );

        // Insert user into database
        db.query(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
          (err, result: any) => {
            if (err) {
              return res.status(500).json({
                message: "Failed to register user",
              });
            }

            // Generate JWT token
            const token = generateToken(result.insertId);

            // Send response
            res.status(201).json({
              message: "User registered successfully",
              token,
              user: {
                id: result.insertId,
                name,
                email,
              },
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==========================
// LOGIN USER
// ==========================
export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Find user
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results: any) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
          });
        }

        // User not found
        if (results.length === 0) {
          return res.status(400).json({
            message: "Invalid email or password",
          });
        }

        const user = results[0];

        // Compare password
        const isMatch = await bcrypt.compare(
          password,
          user.password
        );

        if (!isMatch) {
          return res.status(400).json({
            message: "Invalid email or password",
          });
        }

        // Generate token
        const token = generateToken(user.id);

        // Send response
        res.status(200).json({
          message: "Login successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};