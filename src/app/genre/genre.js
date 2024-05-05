import { Box, Typography } from '@mui/material';

const itemData = [ //mock data
    {
        img: 'https://image.tmdb.org/t/p/original/fr047KaRVQW5egYeJIlkch3S7C7.jpg',
    },
    {
        img: 'https://www.rotoscopers.com/wp-content/uploads/2014/03/new-maleficent-poster-angelina-jolie-full-body.jpg',
    },
    {
        img: 'https://www.kondonung.com/wp-content/uploads/2020/05/Fantasy-Island.jpg',
    },
    {
        img: 'https://doomovie.win/wp-content/uploads/2022/05/Thunder-and-the-House-of-Magic-2013.jpg',
    },
    {
        img: 'https://image.tmdb.org/t/p/original/yoSoQLvgwQJUDdztgOsJxcYgM8v.jpg',
    },
    {
        img: 'https://staticg.sportskeeda.com/editor/2023/01/8e794-16746269718644-1920.jpg',
    }
];

const genreItems = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Investigation', 'Romance', 'Sci-fi', 'Thriller'];

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
                    {genreItems[3].toUpperCase()}
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