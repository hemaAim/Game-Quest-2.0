export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <p>ID atual: {id}</p> {/* <-- Aqui o id está sendo usado */}
      {children}
    </div>
  );
}
