<script setup>
import { ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { editComment, deleteComment } from '../api/commentApi';
import { useAuthStore } from '../stores/authStore';
import { formatDate } from '../utils/formatDates';

const props = defineProps(['comment']);
const emit = defineEmits(['editComment', 'deleteComment']);
const auth = useAuthStore();

const isOwner = computed(() => auth.userId === props.comment.owner._id);
const isEditing = ref(false);
const editedComment = ref({ 
   title: props.comment.title, 
   body: props.comment.body 
});

const rules = {
  editedComment: {
    title: { required, minLength: minLength(5), maxLength: maxLength(30) },
    body: { required, minLength: minLength(10), maxLength: maxLength(500) }
  }
};

const v$ = useVuelidate(rules, { editedComment });

const snackbar = ref({
  show: false,
  message: '',
  color: 'green-darken-4'
});

const sanitizeForm = () => {
  editedComment.value.title = editedComment.value.title.trim();
  editedComment.value.body = editedComment.value.body.trim();
};

const edit = async () => {
  v$.value.$touch();
  sanitizeForm();
  if (!v$.value.$invalid) {
    try {
      await editComment(props.comment._id, editedComment.value);
      isEditing.value = false;
      snackbar.value = {
        show: true,
        message: 'Comment edited successfully!',
        color: 'green-darken-4'
      };
      setTimeout(() => {
         emit('editComment');
    }, 1000);
    } catch (error) {
      console.error('Error editing comment:', error);
      snackbar.value = {
        show: true,
        message: error.response.data.error || 'Failed to edit comment. Please try again.',
        color: 'red-darken-4'
      };
    }
  } else {
    snackbar.value = {
      show: true,
      message: 'Please fill in all fields correctly.',
      color: 'red-darken-4'
    };
  }
};

const del = async () => {
  try {
    await deleteComment(props.comment._id);
    snackbar.value = {
      show: true,
      message: 'Comment deleted successfully!',
      color: 'green-darken-4'
    };
    setTimeout(() => {
      emit('deleteComment');
    }, 1000);
  } catch (error) {
    console.error('Error deleting comment:', error);
    snackbar.value = {
      show: true,
      message: error.response.data.error || 'Failed to delete comment. Please try again.',
      color: 'red-darken-4'
    };
  }
};
</script>

<template>
  <div>
    <div v-if="isEditing">
      <v-card>
        <v-form>
          <v-text-field
            label="Title"
            v-model="editedComment.title"
            :error-messages="v$.editedComment.title.$errors.map(e => e.$message)"
            @blur="v$.editedComment.title.$touch"
          />
          <v-textarea
            label="Comment"
            v-model="editedComment.body"
            :error-messages="v$.editedComment.body.$errors.map(e => e.$message)"
            @blur="v$.editedComment.body.$touch"
          />
          <v-btn color="amber" size="small" @click="edit">Update Comment</v-btn>
          <v-btn color="grey" size="small" @click="isEditing = false">Cancel</v-btn>
        </v-form>
      </v-card>
    </div>
    <div v-else>
      <v-card>
        <v-card-header>
          <v-row>
            <v-col>
              <v-card-title>{{ comment.title }}</v-card-title>
              <v-card-subtitle>
                <h4>By {{ comment.owner.username }} on {{ formatDate(comment.createdAt) }}</h4>
              </v-card-subtitle>
            </v-col>
            <v-col>
              <v-avatar size="55">
                <v-img :src="comment.owner.avatar || '/img-placeholder.png'" />
              </v-avatar>
            </v-col>
          </v-row>
        </v-card-header>
        <v-row>
          <v-card-text>
            {{ comment.body }}
          </v-card-text>
        </v-row>
        <v-card-actions v-if="isOwner">
          <v-btn color="green-darken-4" variant="tonal" size="small" @click="isEditing = true">Edit</v-btn>
          <v-btn color="red-darken-4" variant="tonal" size="small" @click="del">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<style scoped>
.v-form {
  padding: 0.5rem;
}
.v-card {
  margin: 0.7rem 0rem;
}
.v-avatar {
  margin-top: 0.5rem;
}
.v-card-text {
  margin-bottom: 0.3rem;
}
</style>