import MainTemplate from "../../_ui/main-template";

export default function Layout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  const { children } = props;
  return (
    <MainTemplate>
      {children}
    </MainTemplate>
  )
}