import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    main: "#0ea5e9",
    primary: {
      main: "#0ea5e9",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6366f1",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0f172a",
      paper: "#1e293b",
    },
    text: {
      secondary: "rgba(255,255,255,0.8)",
    },
    inputColor: "rgba(39,41,45,1)",
    surfaceColor: "#1e293b",
    platformColor: "#1e293b",
    backgroundColor: "#0f172a",
    distributionColor: "#40E0D0",
    green: "#5cc879",
    borderRadius: 8,
    defaultBorder: "1px solid rgba(255,255,255,0.3)",
    jsonIconStyle: "round",
    jsonTheme: "summerfruit",
    jsonCollapseStringsAfterLength: 100,
    reactJsonStyle: {
      padding: 5,
      width: "98%",
      borderRadius: 5,
      border: "1px solid rgba(255,255,255,0.7)",
      overflowX: "auto",
    },
    textFieldStyle: {
      backgroundColor: "#212121",
      borderRadius: 5,
      height: 40,
    },
    DialogStyle: {
      backgroundColor: "#212121",
      borderRadius: 2,
      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      border: "1px solid #494949",
    },
    innerTextfieldStyle: {
      height: 40,
      fontSize: 16,
      backgroundColor: "#212121",
    },
    tooltip: {
      backgroundColor: "white",
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: 1,
      fontSize: 11,
    },
    defaultImage: "/images/no_image.png",
    singulOrange: "/images/singul_orange.png",
    singulGreen: "/images/singul_green.png",
    singulBlackWhite: "/images/singul_black_white.png",
  },
  typography: {
    fontFamily: `"Inter", sans-serif`,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    h1: { fontSize: 40 },
    h4: { fontSize: 30, fontWeight: 500 },
    h6: { fontSize: 22 },
    body1: { fontSize: 18 },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        list: { backgroundColor: "#27292d" },
      },
    },
  },
});

export default theme;

export const getTheme = (themeMode, brandColor) =>
  createTheme({
      palette: {
        mode: themeMode,
        main: brandColor || "#0ea5e9",
        primary: {
          main: brandColor || "#0ea5e9",
          contrastText:  "#ffffff",
        },
        secondary: {
          main: "#6366f1",
          contrastText:"#ffffff",
        },
        background: {
          default: themeMode === "dark" ? "#0f172a" : "#f1f1f1",
          paper: themeMode === "dark" ? "#1e293b" : "#ffffff",
        },
        text: {
          primary: themeMode === "dark" ? "#ffffff" : "#1A1A1A",
          secondary: themeMode === "dark" ? "#9E9E9E" : "#616161",
        },
        type: themeMode,
        inputColor: themeMode === "dark" ? "rgba(39,41,45,1)" : "rgba(245, 245, 245, 1)",
        textColor: themeMode === "dark" ? "#F1F1F1" : "#1A1A1A",
        textPrimary: themeMode === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(26, 26, 26, 0.8)",
        surfaceColor: themeMode === "dark" ? "#1e293b" : "#EFEFEF",
        platformColor: themeMode === "dark" ? "#1e293b" : "#ffffff",
        backgroundColor: themeMode === "dark" ? "#0f172a" : "#f1f1f1",
        distributionColor: themeMode === "dark" ? "#40E0D0" : "#008080",
        cardBackgroundColor: themeMode === "dark" ? "#1e293b" : "#eaeaea",
        cardHoverColor: themeMode === "dark" ? "#334155" : "#F0F0F0", 
        hoverColor: themeMode === "dark" ? "#334155" : "#D6D6D6",
        usecaseCardColor: themeMode === "dark" ? "#1e293b" : "rgba(245, 245, 245, 1)",
        usecaseCardHoverColor: themeMode === "dark" ? "#334155" : "rgba(245, 245, 245, 1)",
        usecaseDialogFieldColor: themeMode === "dark" ? "#1e293b" : "#F5F5F5",
        accentColor: themeMode === "dark" ? "#0ea5e9" : "#0ea5e9",
        green: themeMode === "dark" ? "#5cc879" : "#008000",
        defaultBorder: themeMode === "dark" ? '1px solid #334155' : '1px solid #CCCCCC',
        linkColor: brandColor === "#0ea5e9" ? "#0284c7" : brandColor,

        borderRadius: 10,
        loaderColor: themeMode === "dark" ? "#1a1a1a" : "#E0E0E0",
        jsonIconStyle: "round",
        jsonTheme: themeMode === "dark" ? "summerfruit" : {
          base00: "#ffffff", // background
          base01: "#f0f0f0", // very light grey
          base02: "#f5f5f5", // light grey
          base03: "#999999", // dim text
          base04: "#444444", // bold keys
          base05: "#333333", // normal text
          base06: "#1a1a1a", // darker text
          base07: "#000000", // black
          base08: "#f14c4c", // red
          base09: "#f58c1f", // orange
          base0A: "#f2c032", // yellow
          base0B: "#51975d", // green
          base0C: "#2aa198", // teal
          base0D: "#007acc", // blue (keys!)
          base0E: "#c586c0", // purple
          base0F: "#d16969", // brown
        },
        jsonCollapseStringsAfterLength: 100,
        drawer: {
          backgroundColor: themeMode === "dark" ? "#262626" : "#f9f9f9"
        },
        reactJsonStyle: {
          padding: 5,
          width: "98%",
          borderRadius: 5,
          border: themeMode === "dark" ? "1px solid rgba(255,255,255,0.7)" : "1px solid rgba(0,0,0,0.3)",
          backgroundColor: themeMode === "dark"
            ? "#1A1A1A"
            : "#f1f1f1",
          color: themeMode === "dark"
            ? "#F1F1F1"
            : "#1A1A1A",
          overflowX: "auto",
        },        
        textFieldStyle: {
          backgroundColor: themeMode === "dark" ? "#212121" : "#FFFFFF",
          color: themeMode === "dark" ? "#ffffff" : "#000000",
          borderRadius: "5px",
          height: 40,
          border: themeMode === "dark" ? "1px solid #4D4D4D" : "1px solid #E0E0E0",
        },
        DialogStyle: {
          backgroundColor: themeMode === "dark" ? "#212121" : "#ffffff",
          borderRadius: 2,
          boxShadow: themeMode === "dark" ? "0px 0px 10px 0px rgba(0,0,0,0.75)" : "0px 0px 10px 0px rgba(0,0,0,0.2)",
          border: themeMode === "dark" ? "1px solid #494949" : "1px solid #cccccc",
        },
        innerTextfieldStyle: {
          height: 40,
          fontSize: 16,
          backgroundColor: themeMode === "dark" ? "#212121" : "#f5f5f5",
        },
        tooltip: {
          backgroundColor: themeMode === "dark" ? "#212121" : "#ffffff",
          color: themeMode === "dark" ? "#ffffff" : "#000000",
          border: themeMode === "dark" ? "1px solid #494949" : "1px solid #cccccc",
        },
        chipStyle: {
          backgroundColor: themeMode === "dark" ? "#333333" : "#F5F5F5",
          borderColor: themeMode === "dark" ? "#444444" : "#E0E0E0",
          color: themeMode === "dark" ? "#FFFFFF" : "#333333",
        },        
        defaultImage: "/images/no_image.png",
        singulOrange: "/images/singul_orange.png",
        singulGreen: "/images/singul_green.png",
        singulBlackWhite: "/images/singul_black_white.png",
        scrollbarColor: themeMode === "dark" ? "#494949 #2f2f2f": "#c1c1c1 #f1f1f1",
        scrollbarColorTransparent: themeMode === "dark" ? '#494949 transparent': "#c1c1c1 transparent",
      },
      typography: {
        fontFamily: `"Inter", sans-serif`,
        color: themeMode === "dark" ? "#ffffff" : "#000000",
        useNextVariants: true,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightSemiBold: 600,
        fontWeightBold: 700,
        allVariants: {
          color: themeMode === "dark" ? "#ffffff" : "#1A1A1A",
        },      
        h1: {
          fontSize: 40,
          color: themeMode === "dark" ? "#ffffff" : "#1A1A1A"
        },
        h2: {
          fontSize: 36,
          color: themeMode === "dark" ? "#ffffff" : "#1A1A1A"
        },
        h3: {
          fontSize: 32,
          color: themeMode === "dark" ? "#ffffff" : "#1A1A1A"
        },
        h4: {
          fontSize: 30,
          fontWeight: 500,
          color: themeMode === "dark" ? "#ffffff" : "#1A1A1A"
        },
        h6: {
          fontSize: 22,
          color: themeMode === "dark" ? "#ffffff" : "#1A1A1A"
        },
        body1: {
          fontSize: 16,
          color: themeMode === "dark" ? "#ffffff" : "#1A1A1A"
        },
        body2: {
          fontSize: 14,
          color: themeMode === "dark" ? "#ffffff" : "#1A1A1A"
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: '4px',
            },
          },
          variants: [
            {
              props: { variant: 'text', color: 'primary' },
              style: {
                color: themeMode === "dark" ? "#ffffff" : "#1A1A1A",
                whiteSpace: "nowrap",
		            textWrap: "normal",
              },
            },
            {
              props: { variant: 'text', color: 'secondary' },
              style: {
                color: themeMode === "dark" ? "#9E9E9E" : "#616161",
                whiteSpace: "nowrap",
		            textWrap: "normal",
              },
            },
            {
              props: { variant: 'contained', color: 'primary' },
              style: {
                backgroundColor: themeMode === "dark" ? brandColor || '#0ea5e9' : brandColor || '#0ea5e9',
                color: themeMode === "dark" ? '#ffffff': '#ffffff',
                borderRadius: '4px',
                whiteSpace: "nowrap",
		            textWrap: "normal",
                '&:hover': {
                  fontWeight: 600,
                  backgroundColor: themeMode === 'dark' ? brandColor || "#0284c7" : brandColor || '#0284c7',
                  color: themeMode === "dark" ? '#ffffff': '#ffffff',
                },
              },
            },
            {
              props: { variant: 'contained', color: 'secondary' },
              style: {
                backgroundColor: themeMode === "dark" ? '#494949' : '#C9C9C9',
                color: themeMode === "dark" ? '#ffffff' : '#4C4C4C',
                borderRadius: '4px',
                boxShadow: 'none',
                whiteSpace: "nowrap",
		            textWrap: "normal",
                '&:hover': {
                  fontWeight: 600,
                  border: themeMode === "dark" ? '1px solid #f1f1f1' : 'none',
                  backgroundColor: themeMode === "dark" ? '#494949' : '#C9C9C9',
                  color: themeMode === "dark" ? '#ffffff' : '#4C4C4C',
                },
              },
            },
            {
              props: { variant: 'outlined', color: 'primary' },
              style: {
                borderColor: themeMode === "dark" ?  brandColor || "#0ea5e9" : brandColor || "#0ea5e9",
                color: themeMode === "dark" ? brandColor || "#0ea5e9" : brandColor || "#0ea5e9",
                whiteSpace: "nowrap",
                fontWeight: 'normal',
		            textWrap: "normal",
                '&:hover': {
                  backgroundColor: themeMode === "dark" ? brandColor || "#0ea5e9" : "#e0f2fe",
                  color: themeMode === "dark" ? "#ffffff" : "#0284c7",
                  fontWeight: 600,
                },
              },
            },            
            {
              props: { variant: 'outlined', color: 'secondary' },
              style: {
                border: '1px solid #C5C5C5',
                color: themeMode === "dark" ? '#C5C5C5' : '#2D2D2D',
                whiteSpace: "nowrap",
		            textWrap: "normal",
                '&:hover': {
                  backgroundColor: themeMode === "dark" ? '#C5C5C5' : '#EFEFEF',
                  borderColor: themeMode === "dark" ? '#C5C5C5' : '#2D2D2D',
                  fontWeight: 600,
                  color: themeMode === "dark" ? '#1a1a1a' : '#1A1A1A',
                },
              },
            },
            {
              props: { variant: 'aiButton' },
              style: {
                background: 'linear-gradient(90deg, #ff8544 0%, #ec517c 50%, #9c5af2 100%)',
                color: '#ffffff',
                borderRadius: '4px',
                whiteSpace: "nowrap",
                textWrap: "normal",
                border: 'none',
                boxShadow: 'none',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: '#ffffff',
                  textShadow: '0 0 1px currentColor',
                },
                '&:active': {
                  background: 'linear-gradient(90deg, #e6743a 0%, #d4456e 50%, #8a4de8 100%)',
                },
                '&:disabled': {
                  background: themeMode === "dark" ? '#494949' : '#C9C9C9',
                  color: themeMode === "dark" ? '#9E9E9E' : '#616161',
                },
              },
            },
            {
              props: { variant: 'aiButtonGhost' },
              style: {
                background: 'transparent',
                border: 'none',
                borderRadius: '4px',
                color: '#ffffff',
                whiteSpace: "nowrap",
                textWrap: "normal",
                boxShadow: 'none',
                transition: 'all 0.2s ease-in-out',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: '4px',
                  padding: '2px',
                  background: 'linear-gradient(90deg, #ff8544 0%, #ec517c 50%, #9c5af2 100%)',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                  WebkitMaskComposite: 'xor',
                  transition: 'opacity 0.2s ease-in-out',
                  zIndex: -1,
                },
                '&:hover': {
                  background: 'linear-gradient(90deg, #ff8544 0%, #ec517c 50%, #9c5af2 100%)',
                  color: '#ffffff',
                  '&::before': {
                    opacity: 0,
                  },
                },
                '&:active': {
                  background: 'linear-gradient(90deg, #e6743a 0%, #d4456e 50%, #8a4de8 100%)',
                },
                '&:disabled': {
                  background: 'transparent',
                  color: themeMode === "dark" ? '#9E9E9E' : '#616161',
                  '&::before': {
                    background: themeMode === "dark" ? '#494949' : '#C9C9C9',
                  },
                },
              },
            },
          ],
        },
        MuiTab: {
          styleOverrides: {
            root: {
              color: themeMode === "dark" ? "#C5C5C5" : "#1A1A1A",
            },
          },
        },
        MuiMenu: {
          styleOverrides: {
            list: {
              backgroundColor: themeMode === "dark" ? "#27292d" : "#ffffff",
            },
          },
        },
        MuiCssBaseline: {
          styleOverrides: `
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-display: swap;
              font-weight: 300;
              src: local('Inter Light'), local('Inter-Light');
            }
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Inter Regular'), local('Inter-Regular');
            }
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-display: swap;
              font-weight: 500;
              src: local('Inter Medium'), local('Inter-Medium');
            }
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-display: swap;
              font-weight: 600;
              src: local('Inter SemiBold'), local('Inter-SemiBold');
            }
            @font-face {
              font-family: 'Inter';
              font-style: normal;
              font-display: swap;
              font-weight: 700;
              src: local('Inter Bold'), local('Inter-Bold');
            }
          `,
        },
      },
    });
