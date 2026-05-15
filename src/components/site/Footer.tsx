import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Resumind</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">AI that helps your resume land interviews.</p>
        </div>
        {[
          { title: "Product", items: ["Features", "Pricing", "Templates", "Changelog"] },
          { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
          { title: "Legal", items: ["Privacy", "Terms", "Security", "Cookies"] },
        ].map((c) => (
          <div key={c.title}>
            <h4 className="text-sm font-semibold">{c.title}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.items.map((i) => <li key={i} className="hover:text-foreground transition cursor-pointer">{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-border/50 pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Resumind. Crafted with AI.
      </div>
    </footer>
  );
}