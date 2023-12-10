import {useState, useEffect} from 'react';
import {Box,AppBar, Toolbar, IconButton, Typography, Menu, Container, Button, MenuItem} from '@mui/material';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CartWidget from '../CartWidget/CartWidget';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';

function Navbar() {
  const { dropCart, cart } = useContext(CartContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorCategory, setAnchorCategory] = useState(null);
  const [cartOptions, setCartOptions] = useState([
    {name: 'Carrito', link: '/Cart'},
    {name: 'Vaciar Carrito', action: dropCart}
  ]);
  
  const categoryOptions = ['Ketostyle', 'Otros Productos', 'Chuchis'];

  const pages = [
    {name: 'Productos', link: '/'},
    {name: 'Categorias', menu: categoryOptions},
  ];
  


  useEffect(() => {
    if(cart.length > 0 && cartOptions.length == 2){
      setCartOptions([
        {name: 'Carrito', link: '/Cart'},
        {name: 'Vaciar Carrito', action: dropCart},
        {name: 'Realizar Compra', link: '/Compra'}
      ])
    }else{
      setCartOptions([
        {name: 'Carrito', link: '/Cart'},
        {name: 'Vaciar Carrito', action: dropCart}
      ])
    }
  }, [cart])
  


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenCategoryMenu = (event) => {
    setAnchorCategory(!anchorCategory ? event.currentTarget : null);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setAnchorCategory(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCategoryMenu = () => {
    setAnchorCategory(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>   
            <Link to={'/'} > 
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                Ketostyle
              </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, i) => (
                <MenuItem key={`${page}-${i}`} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" sx={{ color: 'white' }} >
                      <Link to={page.link}>{page.name}</Link>
                    </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, i) => (
              page.link ? 
              <Link     key={`${page}-${i}`} to={page.link}>
                <Button
                  key={`${page}btn-${i}`}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >{page.name}
                </Button>
              </Link> :
              <Button
                key={`${page}btn-${i}`}
                onClick={handleOpenCategoryMenu}

                sx={{ my: 2, color: 'white', display: 'block' }}
              >{page.name}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorCategory}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorCategory)}
                  onClose={handleCloseCategoryMenu}
                >
                {page.menu.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseCategoryMenu}>
                    <Link to={`/${setting.toLowerCase()}`}  >{setting}</Link >
                  </MenuItem>
                ))}
                </Menu>

              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>            
            <CartWidget handleOpenUserMenu={handleOpenUserMenu}/>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {cartOptions.map((setting, key) => (
                <MenuItem key={key} onClick={handleCloseUserMenu}>
                  <Link to={setting.link || '#'} onClick={setting.action || null}><Typography textAlign="center">{setting.name}</Typography></Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
