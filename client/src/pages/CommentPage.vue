<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AddComment from '../components/AddComment.vue';
import ViewComment from '../components/ViewComment.vue';
import { getAllComments, addComment } from '../api/commentApi';

const route = useRoute();
const recipeId = route.params.id;

const comments = ref([]);
const newComment = ref({
  title: '',
  body: '',
});
const showAdd = ref(false);
const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4'
});

const fetchComm = async () => {
  try {
    comments.value = await getAllComments(recipeId);  
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
};

const addComm = async (comment) => {
  try {
    await addComment(comment);
    newComment.value.title = '';
    newComment.value.body = '';
    showAdd.value = false;
    snackbar.value = {
      show: true,
      message: 'Comment added successfully!',
      color: 'green-darken-4'
    };
    await fetchComm();
  } catch (error) {
   snackbar.value = {
      show: true,
      message: error.response.data.error || 'Error during adding comment.',
      color: 'red-darken-4'
    };
  }
};

onMounted(() => {
  fetchComm();
});
</script>

<template>
  <v-container>
    <h2>Comments Section</h2>
    <v-btn color="teal-darken-3" variant="tonal" size="small" @click="showAdd = !showAdd">
      {{ showAdd ? 'Cancel' : 'Add Comment' }}
    </v-btn>
    <AddComment v-if="showAdd" :newComment="newComment" :recipeId="recipeId" @addComment="addComm" />
    
    <div v-for="comment in comments" :key="comment._id">
      <ViewComment :comment="comment" @editComment="fetchComm" @deleteComment="fetchComm" />
    </div>
  </v-container>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style scoped>
.v-btn {
  margin: 0.5rem;
}
</style>