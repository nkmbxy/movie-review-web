import { Box, Typography } from '@mui/material';

const itemData = [ //mock data
    {
        img: 'https://freakingeek.com/wp-content/uploads/2023/04/Queenmaker-Banniere.jpg',
    },
    {
        img: 'https://puui.wetvinfo.com/vcover_hz_pic/0/gnwjazjgmg997xg1607677060480/0',
    },
    {
        img: 'https://image.tmdb.org/t/p/original/bFEFDqhxxon7CTe6k8lUgPE2qUO.jpg',
    },
    {
        img: 'https://image.tmdb.org/t/p/original/dkIFINLUp6eiee1ATsHfJpT2Q1V.jpg',
    },
    {
        img: 'https://cms.dmpcdn.com/movie/2021/02/08/3d610fc0-69f4-11eb-8623-672bded2bd39_original.png',
    },
    {
        img: 'https://image.tmdb.org/t/p/original/jOpb4ZMF9WyE1YPJfMfhonKGJzH.jpg',
    }
];

export default function MyList() {
    return (
        <>
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Typography 
                    variant="h4"
                    sx={{
                        ml: 5,
                        marginTop:4,
                        fontWeight: 700,
                        letterSpacing: ".1rem",
                        textDecoration: "none",
                      }}>
                    MY LIST
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {itemData.map((item) => (
                    <Box key={item.img} sx={{ width: 200, height: 200, margin: 1}}>
                        <img
                            src={`${item.img}`}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </Box>
                ))}
            </Box>
        </>
    );
}