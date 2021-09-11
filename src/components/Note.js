import { Avatar, Typography, Card, CardHeader, CardContent, IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    work: {
        background: 'purple',

    },
    money: {
        background: 'lightblue',
    },
    todos: {
        background: 'crimson',
    },
    reminders: {
        background: 'orange',
    },

});

function Note({ note, handleDelete }) {
    const classes = useStyles();

    return (
        <div>
            <Card>
                <CardHeader
                    action={
                        <IconButton onClick={() => handleDelete(note.id)}>
                            <DeleteOutlined />
                        </IconButton>
                    }
                    avatar={
                        <Avatar
                            className={classes[note.category]}
                        >
                            {note.title[0]}
                        </Avatar>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" align="justify">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Note;