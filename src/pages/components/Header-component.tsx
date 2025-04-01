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
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import Logo from "~/public/icons/logo-primary.svg";
import Link from "next/link";
import styles from "@/styles/Header.module.scss";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Logout } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";

import Badge from "@mui/material/Badge";

interface Props {
  children: React.ReactElement;
}

const drawerWidth = 240;
const navItems = [
  { label: "Services", link: "/services" },
  { label: "Pricing", link: "/pricing" },
  { label: "Case Studies", link: "/case-studies" },
  { label: "Our Consultants", link: "/consultants" },
];

function ElevationScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const boxShadow = trigger ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none";

  return React.cloneElement(children, {
    sx: { boxShadow },
    elevation: trigger ? 4 : 0,
  });
}

export default function Header(props: any) {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function signoutFn() {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  }

  const { pathname } = useRouter();
  const router = useRouter();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h2" component="div">
        <Link href="/">
          <Image alt="logo" priority className={styles.logo} src={Logo} />
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Link style={{ width: "100%" }} href={item.link}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box className={styles.drawerContent}>
        <Link style={{ width: "100%" }} href="/contact">
          <Button
            style={{ width: "100%" }}
            className={`links ${styles.marginB}`}
          >
            Get in touch
          </Button>
        </Link>
        {status === "loading" && (
          <CircularProgress
            style={{ color: "var(--blueColor)" }}
            size={20}
          ></CircularProgress>
        )}
        {status !== "authenticated" && status !== "loading" && (
          <Link href="/signin">
            <Button className="btn btn-third">Get started</Button>
          </Link>
        )}
        {status === "authenticated" && (
          <Button onClick={signoutFn} className={`links ${styles.marginB}`}>
            <Logout style={{ marginRight: ".2rem" }} fontSize="small" />
            Logout
          </Button>
        )}
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
                <Link href="/">
                  <Image
                    alt="logo"
                    priority
                    className={styles.logo}
                    src={Logo}
                  />
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
                      pathname === item.link ||
                      pathname === `${item.link}/[[...service]]`
                        ? styles.navLinkActive
                        : ""
                    } transitionLink`}
                    key={item.label}
                  >
                    <Button className="links no-hover-background">
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </Box>

              <Box className={styles.btnInfo}>
                <Link className={styles.contact} href="/contact">
                  <Button className={`links`}>Get in touch</Button>
                </Link>

                {status === "loading" && (
                  <CircularProgress
                    style={{ color: "var(--blueColor)" }}
                    size={20}
                  ></CircularProgress>
                )}

                {status === "authenticated" && (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      size="small"
                      onClick={handleMenu}
                    >
                      <div className="badgeAvatar">
                        <Badge
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          variant="dot"
                          invisible
                        >
                          {/* <Avatar className={styles.avatar} /> */}
                          <Avatar
                            alt="initials"
                            className={styles.avatarInitials}
                          >
                            {session.user.email && session.user.email[0]}
                          </Avatar>
                        </Badge>
                      </div>
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClose();

                          router.push(
                            `${
                              session.user.role === "u"
                                ? "/dashboard"
                                : "/consultant/dashboard-consultant"
                            }  `
                          );
                        }}
                      >
                        Dashboard
                      </MenuItem>

                      <MenuItem onClick={signoutFn}>
                        <Logout
                          style={{ marginRight: ".2rem" }}
                          fontSize="small"
                        />
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                )}

                {status !== "authenticated" && status !== "loading" && (
                  <Link href="/signin">
                    <Button size="large" className="btn btn-third">
                      Get started
                    </Button>
                  </Link>
                )}
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
