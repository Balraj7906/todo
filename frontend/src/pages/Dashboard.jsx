import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Checkbox,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { todos, setAuthToken } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [todoList, setTodoList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: null,
  });
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todos.getAll();
      setTodoList(response.data);
    } catch (error) {
      toast.error('Failed to fetch todos');
    }
  };

  const handleOpenDialog = (todo = null) => {
    if (todo) {
      setEditingTodo(todo);
      setFormData({
        title: todo.title,
        description: todo.description || '',
        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
      });
    } else {
      setEditingTodo(null);
      setFormData({
        title: '',
        description: '',
        dueDate: null,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTodo(null);
    setFormData({
      title: '',
      description: '',
      dueDate: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTodo) {
        await todos.update(editingTodo._id, formData);
        toast.success('Todo updated successfully');
      } else {
        await todos.create(formData);
        toast.success('Todo created successfully');
      }
      handleCloseDialog();
      fetchTodos();
    } catch (error) {
      toast.error(editingTodo ? 'Failed to update todo' : 'Failed to create todo');
    }
  };

  const handleToggle = async (id) => {
    try {
      await todos.toggle(id);
      fetchTodos();
    } catch (error) {
      toast.error('Failed to toggle todo status');
    }
  };

  const handleDelete = async (id) => {
    try {
      await todos.delete(id);
      toast.success('Todo deleted successfully');
      fetchTodos();
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            getDone
          </Typography>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Welcome, {user?.username}
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Your Todos</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Todo
          </Button>
        </Box>

        <Paper elevation={2}>
          <List>
            {todoList.map((todo) => (
              <ListItem
                key={todo._id}
                secondaryAction={
                  <Box>
                    <IconButton edge="end" onClick={() => handleOpenDialog(todo)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(todo._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <Checkbox
                  edge="start"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo._id)}
                />
                <ListItemText
                  primary={todo.title}
                  secondary={
                    <>
                      {todo.description}
                      {todo.dueDate && (
                        <Typography variant="caption" display="block">
                          Due: {format(new Date(todo.dueDate), 'PPp')}
                        </Typography>
                      )}
                    </>
                  }
                  sx={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {editingTodo ? 'Edit Todo' : 'Create New Todo'}
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Title"
                fullWidth
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Due Date (Optional)"
                  value={formData.dueDate}
                  onChange={(date) => setFormData({ ...formData, dueDate: date })}
                  renderInput={(params) => (
                    <TextField {...params} margin="dense" fullWidth />
                  )}
                />
              </LocalizationProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingTodo ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
    </>
  );
}

export default Dashboard;
