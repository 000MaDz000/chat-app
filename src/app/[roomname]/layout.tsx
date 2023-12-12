import MainTemplate from "../_ui/main-template";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainTemplate>
      {children}
    </MainTemplate>
  )
}