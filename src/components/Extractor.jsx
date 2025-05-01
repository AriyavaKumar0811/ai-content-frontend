import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Button,
  Container,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  Link,
} from '@mui/material';

const fetchContents = async () => {
  const res = await axios.get('https://ai-content-extractor.onrender.com/api/content');
  return res.data;
};

const postContent = async (url) => {
  const res = await axios.post('https://ai-content-extractor.onrender.com/api/content', { url });
  return res.data;
};

function Extractor() {
  const [url, setUrl] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery('contents', fetchContents);
  const mutation = useMutation(postContent, {
    onSuccess: () => {
      queryClient.invalidateQueries('contents');
      setUrl('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) mutation.mutate(url);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        🧠 Article Extraction API
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
        Extractor API is a simple and powerful API and app that handles all the tedious work and problems associated with clean text extraction.
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Tinq.ai Article Extractor Demo
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                required
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                label="Enter article URL"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ height: '100%' }}
              >
                ➤ EXTRACT
              </Button>
            </Grid>
          </Grid>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <List sx={{ mt: 4 }}>
            {data?.map((item) => (
              <ListItem
                key={item._id}
                sx={{ mb: 2, border: '1px solid #ccc', borderRadius: 2, p: 2 }}
              >
                <Box>
                  <Link href={item.url} target="_blank" rel="noopener" underline="hover">
                    {item.url}
                  </Link>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1 }}>
                    {item.extractedText}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <Typography variant="caption" align="center" display="block" color="text.secondary" mt={6}>
        Trusted by professionals and members of leading institutions
      </Typography>
    </Container>
  );
}

export default Extractor;
