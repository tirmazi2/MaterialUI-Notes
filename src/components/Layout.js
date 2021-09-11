import { makeStyles } from "@material-ui/styles";
import { List, ListItem, ListItemIcon, AppBar, Avatar, Divider, Drawer, ListItemText, Toolbar, Typography, } from "@material-ui/core";
import { SubjectOutlined, AddCircleOutlineOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from "react-router";
import { format } from 'date-fns'
import { grey } from "@material-ui/core/colors";

const drawerWidth = 200;
const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#fff',
            width: '100%',
            padding: theme.spacing(3),
            paddingBottom: theme.spacing(8)
        },
        drawerWidth: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#eee',
            color: '#f50057',
            borderRight: '3px solid #f50057'
        },
        avatar: {
            background: 'crimson',
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        title: {
            marginBottom: theme.spacing(5)
        },
        bottomAppbar: {
            top: 'auto',
            bottom: 0,
            backgroundColor: grey[100],
            textAlign: 'center'
        }
    }
});

function Layout({ children }) {
    const classes = useStyles();
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color='secondary' />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color='secondary' />,
            path: '/create'
        }
    ];
    const history = useHistory();
    const location = useLocation();

    return (
        <div className={classes.root}>
            {/* navbar */}
            <AppBar
                className={classes.appbar}
                color='secondary'
                elevation={1}
            >
                <Toolbar>
                    <Typography variant='h6'>
                        Today is the {format(new Date(), 'MMMM do, Y')}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* app drawer */}
            <Drawer
                className={classes.drawerWidth}
                variant="permanent"
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                <List>
                    <ListItem className={classes.title}>
                        <ListItemIcon>
                            <Avatar className={classes.avatar}>MN</Avatar>
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant='h6' color='textSecondary'>MUI Notes</Typography>
                        </ListItemText>
                    </ListItem>

                    <Divider />

                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            className={location.pathname == item.path ? classes.active : null}
                            onClick={() => history.push(item.path)}
                        >
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText primary={item.text} color='textSecondary' />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
            <AppBar
                className={`${classes.bottomAppbar} ${classes.appbar}`}
                elevation={0}
            >
                <Toolbar>
                    <Typography variant='body1' color='textSecondary'>
                        &copy; 2021 MaterialUI Notes
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Layout;