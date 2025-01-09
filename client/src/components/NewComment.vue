<script setup>
import { ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

const props = defineProps(["newComment", "recipeId"]);
const emit = defineEmits(["addComment"]);

const rules = {
  newComment: {
    title: { required, minLength: minLength(5), maxLength: maxLength(30) },
    body: { required, minLength: minLength(10), maxLength: maxLength(500) },
  },
};

const v$ = useVuelidate(rules, { newComment: props.newComment });

const snackbar = ref({
  show: false,
  message: "",
  color: "green-darken-4",
});

const sanitizeForm = () => {
  props.newComment.title = props.newComment.title.trim();
  props.newComment.body = props.newComment.body.trim();
};

const submitComm = () => {
  v$.value.$touch();
  sanitizeForm();
  if (!v$.value.$invalid) {
    emit("addComment", { recipe: props.recipeId, ...props.newComment });
  } else {
    snackbar.value = {
      show: true,
      message: "Please fill in all fields correctly.",
      color: "red-darken-4",
    };
  }
};
</script>

<template>
  <v-card>
    <v-form>
      <v-text-field
        label="Title"
        v-model="newComment.title"
        :error-messages="v$.newComment.title.$errors.map((e) => e.$message)"
        @blur="v$.newComment.title.$touch"
      />
      <v-textarea
        label="Comment"
        v-model="newComment.body"
        :error-messages="v$.newComment.body.$errors.map((e) => e.$message)"
        @blur="v$.newComment.body.$touch"
      />
      <v-btn color="amber" size="small" @click="submitComm">Save Comment</v-btn>
    </v-form>
  </v-card>

  <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
    {{ snackbar.message }}
  </v-snackbar>
</template>

<style scoped>
.v-card {
  padding: 0.5rem;
}
.v-btn {
  margin: 0.5rem;
}
</style>
