export default function QuizLayout({ children }:{ children: React.ReactNode }){
  return (
    <html lang="pl">
      <body className="min-h-screen bg-primary text-text-primary">{children}</body>
    </html>
  )
}
