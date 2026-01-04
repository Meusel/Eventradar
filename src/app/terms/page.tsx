
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  export default function TermsPage() {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle>Nutzungsbedingungen</CardTitle>
            <CardDescription>
              Diese Nutzungsbedingungen regeln Ihre Nutzung unserer Dienste.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h2>Annahme der Bedingungen</h2>
            <p>
              Durch die Nutzung unserer Dienste stimmen Sie diesen
              Nutzungsbedingungen zu.
            </p>
  
            <h2>Änderungen der Bedingungen</h2>
            <p>
              Wir können diese Nutzungsbedingungen von Zeit zu Zeit ändern. Wir
              werden Sie über alle Änderungen informieren, indem wir die neuen
              Nutzungsbedingungen auf dieser Seite veröffentlichen.
            </p>
  
            <h2>Kontakt</h2>
            <p>
              Wenn Sie Fragen zu diesen Nutzungsbedingungen haben, kontaktieren
              Sie uns bitte unter [Ihre E-Mail-Adresse].
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
