import { Typography, Box, Avatar, Card, CardContent, Chip } from '@mui/material';
import { cookies } from 'next/headers';
import LogoutButton from '@/components/LogoutButton/LogoutButton';

export default async function Home() {
  // Server Component: fetch leci z serwera Next → Nest.
  // credentials: 'include' tu NIE działa (to nie przeglądarka) —
  // trzeba ręcznie przekazać cookie z requestu użytkownika.
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  const urlById = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/athletes/recbQEAfMlOkkXrfE`;
  const responseById = await fetch(urlById, {
    headers: accessToken
      ? {
          Cookie: `access_token=${accessToken}`,
          Authorization: `Bearer ${accessToken}`,
        }
      : {},
    cache: 'no-store',
  });

  const athleteData = responseById.ok ? await responseById.json() : null;

  if (!athleteData?.firstName) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Bushido Zabrze</Typography>
        <Typography sx={{ mt: 2, color: 'text.secondary' }}>
          Nie udało się pobrać danych zawodnika.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Bushido Zabrze</Typography>
      </Box>

      <Typography variant="h4" sx={{ mb: 3 }}>Witaj, {athleteData.firstName}!</Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: '#333' }}>
            {athleteData.firstName.charAt(0)}
            {athleteData.lastName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6">{athleteData.firstName} {athleteData.lastName}</Typography>
            <Chip
              label={athleteData.degree ? `${athleteData.degree}` : '-'}
              size="small"
              sx={{ bgcolor: 'rgba(46, 125, 50, 0.2)', color: '#4caf50', fontWeight: 'bold' }}
            />
          </Box>
        </CardContent>
        <Box sx={{ display: 'flex', p: 2, borderTop: '1px solid #333' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">DATA URODZENIA</Typography>
            <Typography variant="body1">
              {athleteData.birthDate
                ? new Date(athleteData.birthDate).toLocaleDateString('pl-PL', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : '-'}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">WAGA</Typography>
            <Typography variant="body1">
              {athleteData.weight ? `${athleteData.weight} kg` : '-'}
            </Typography>
          </Box>
        </Box>
      </Card>


        <LogoutButton />
    </Box>
  );
}
