import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-primary">
            Antifome RS
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-foreground-muted">
            Sistema de Gestão da Segurança Alimentar no Rio Grande do Sul
          </p>
          <Button variant="default" size="lg">
            Acessar Sistema
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
