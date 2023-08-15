import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Image from "next/image";
import Logo from "~/public/icons/logo-primary.svg";
import Link from "next/link";
import styles from "@/styles/Header.module.scss";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactElement;
}

const drawerWidth = 240;
const navItems = [
  { label: "Services", link: "/services" },
  { label: "Pricing", link: "/pricing" },
  { label: "Consultants", link: "" },
  { label: "Insights", link: "" },
];
function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props: any) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { pathname } = useRouter();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h2" component="div">
        <Link href="/" passHref>
          <Image alt="logo" className={styles.logo} src={Logo} />
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box className={styles.drawerContent}>
        <Button
          onClick={() => signOut({ redirect: false })}
          className={`links ${styles.marginB}`}
        >
          Get in touch
        </Button>

        <Link href="/signin" passHref legacyBehavior>
          <Button className="btn btn-secondary">Get started</Button>
        </Link>
      </Box>
    </Box>
  );

  return (
    <header>
      <Box sx={{ display: "flex" }}>
        <ElevationScroll {...props}>
          <AppBar color="transparent" component="nav">
            <Toolbar className={styles.headerNav}>
              <IconButton
                className={styles.menuIcon}
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                className={styles.logoContainer}
                variant="h2"
                component="div"
              >
                <Link href="/" passHref>
                  <Image alt="logo" className={styles.logo} src={Logo} />
                </Link>
              </Typography>

              <Box
                className={styles.headerLinks}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {navItems.map((item) => (
                  <Link
                    href={item.link}
                    className={`${
                      pathname === item.link  || pathname === `${item.link}/[[...service]]`  ? styles.navLinkActive : ""
                    } transitionLink`}
                    passHref
                    key={item.label}
                  >
                    <Button className="links no-hover-background">
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </Box>

              <Box className={styles.btnInfo}>
                <Link className={styles.contact} href="/" passHref>
                  <Button
                    onClick={() => signOut({ redirect: false })}
                    className={`links`}
                  >
                    Get in touch
                  </Button>
                </Link>
                <Link href="/signin" passHref>
                  <Button className="btn btn-secondary">Get started</Button>
                </Link>
              </Box>
            </Toolbar>
          </AppBar>
        </ElevationScroll>

        <Box component="nav">
          <Drawer
            variant="temporary"
            className={styles.drawer}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </header>
  );
}
