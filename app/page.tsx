export default async function Home() {

  const urlById = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/athletes/recbQEAfMlOkkXrfE`;
  const responseById = await fetch(urlById);
  const athleteData = await responseById.json();
  console.log(urlById);
  console.log(responseById.status);
  console.log(athleteData);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-16 px-16 bg-white dark:bg-black sm:items-start">
      <pre>{JSON.stringify(athleteData, null, 2)}</pre>
        <p>Imie: {athleteData.firstName}</p>
        <p>Nazwisko: {athleteData.lastName}</p>
        <p>Data urodzenia: {athleteData.birthDate}</p>
      </main>
    </div>
  );
}
