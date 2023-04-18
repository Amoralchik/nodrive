import mainImage from "../assets/landing/main.png";
import { HeaderSearch } from "@components/Layout/Header";
import { Footer } from "@components/Layout/Footer";
import { Helmet } from "react-helmet";

import {
  createStyles,
  Overlay,
  Container,
  Title,
  Button,
  Text,
  rem,
} from "@mantine/core";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  hero: {
    position: "relative",
    backgroundImage: `url(${mainImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  },

  container: {
    height: rem(700),
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingBottom: `calc(${theme.spacing.xl} * 6)`,
    zIndex: 1,
    position: "relative",

    [theme.fn.smallerThan("sm")]: {
      height: rem(500),
      paddingBottom: `calc(${theme.spacing.xl} * 3)`,
    },
  },

  title: {
    color: theme.white,
    fontSize: rem(60),
    fontWeight: 900,
    lineHeight: 1.1,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(40),
      lineHeight: 1.2,
    },

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
      lineHeight: 1.3,
    },
  },

  description: {
    color: theme.white,
    maxWidth: 600,

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
      fontSize: theme.fontSizes.sm,
    },
  },

  control: {
    marginTop: `calc(${theme.spacing.xl} * 1.5)`,

    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },
}));

export function Landing() {
  const auth = useSelector((state: RootState) => state.loginReducer.isLogin);
  const { classes } = useStyles();

  return (
    <div className={classes.hero}>
      <Helmet>
        <title>
          Introducing a New Web Service for File Storage and Sharing
        </title>
      </Helmet>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className="container z-10 relative flex flex-col justify-between align-middle min-h-screen">
        <HeaderSearch />
        <div>
          <Title className={classes.title}>
            Introducing a New Web Service for File Storage and Sharing
          </Title>
          <Text className={classes.description} size="xl" mt="xl">
            Safely Store and Share Your Files Anytime, Anywhere with Our
            User-Friendly Platform
          </Text>

          <NavLink to={auth ? "/archive" : "http://api.localhost:80/auth"}>
            <Button size="xl" radius="xl" className={classes.control}>
              Get started
            </Button>
          </NavLink>
        </div>
        <Footer />
      </Container>
    </div>
  );
}
