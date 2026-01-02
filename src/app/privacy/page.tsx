import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle>Datenschutzerklärung</CardTitle>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p>
            Diese Datenschutzerklärung beschreibt, wie wir Ihre Daten erheben, verwenden und schützen.
          </p>

          <h2>Welche Daten wir erheben</h2>
          <p>
            Wir erheben Daten, um unsere Dienste bereitzustellen und zu verbessern. Dazu gehören:
          </p>
          <ul>
            <li>
              <strong>Kontoinformationen:</strong> Wenn Sie ein Konto erstellen, erheben wir
              Ihren Namen, Ihre E-Mail-Adresse und Ihr Passwort.
            </li>
            <li>
              <strong>Nutzungsdaten:</strong> Wir erheben Daten darüber, wie Sie unsere
              Dienste nutzen, z. B. welche Seiten Sie besuchen und welche Funktionen Sie
              verwenden.
            </li>
            <li>
              <strong>Cookie-Daten:</strong> Wir verwenden Cookies, um Ihre Einstellungen zu
              speichern und Ihre Erfahrung zu personalisieren.
            </li>
          </ul>

          <h2>Wie wir Ihre Daten verwenden</h2>
          <p>Wir verwenden Ihre Daten, um:</p>
          <ul>
            <li>Unsere Dienste bereitzustellen und zu pflegen</li>
            <li>Ihre Erfahrung zu personalisieren</li>
            <li>Mit Ihnen zu kommunizieren</li>
            <li>Unsere Dienste zu verbessern</li>
          </ul>

          <h2>Wie wir Ihre Daten schützen</h2>
          <p>
            Wir treffen Maßnahmen, um Ihre Daten vor unbefugtem Zugriff, unbefugter
            Verwendung oder Offenlegung zu schützen.
          </p>

          <h2>Ihre Einwilligung</h2>
          <p>
            Indem Sie unsere Dienste nutzen und dieser Datenschutzerklärung zustimmen,
            willigen Sie in die Erhebung, Verwendung und Speicherung Ihrer Daten wie in
            diesem Dokument beschrieben ein. Sie können Ihre Einwilligung jederzeit
            widerrufen, indem Sie uns unter [Ihre E-Mail-Adresse] kontaktieren.
          </p>

          <h2>Ihre Rechte</h2>
          <p>Sie haben das Recht auf:</p>
          <ul>
            <li>Zugriff auf Ihre Daten</li>
            <li>Berichtigung Ihrer Daten</li>
            <li>Löschung Ihrer Daten</li>
            <li>Widerspruch gegen die Verarbeitung Ihrer Daten</li>
          </ul>

          <h2>Kontakt</h2>
          <p>
            Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns
            bitte unter [Ihre E-Mail-Adresse].
          </p>
        </CardContent>
      </Card>
    </div>
  );
}