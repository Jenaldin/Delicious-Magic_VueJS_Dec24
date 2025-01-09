<script setup>
import { ref, computed, onMounted } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  numeric,
  url,
} from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
import { getRecipe, editRecipe } from "../api/recipeApi";

const route = useRoute();
const router = useRouter();
const recipeId = route.params.id;

const form = ref({
  title: "",
  type: "",
  image: "",
  ingredients: ["", "", ""],
  steps: ["", "", ""],
  prepTime: "",
  portions: "",
});

const rules = computed(() => ({
  title: { required, minLength: minLength(5), maxLength: maxLength(100) },
  type: { required },
  image: { url },
  ingredients: { required },
  steps: { required },
  prepTime: { required, numeric },
  portions: { required, numeric },
}));

const v$ = useVuelidate(rules, form);

const snackbar = ref({
  show: false,
  message: "",
  color: "green-darken-4",
});

const titleErrors = computed(() =>
  v$.value.title.$errors.map((e) => e.$message),
);
const typeErrors = computed(() => v$.value.type.$errors.map((e) => e.$message));
const imageErrors = computed(() =>
  v$.value.image.$errors.map((e) => e.$message),
);
const prepTimeErrors = computed(() =>
  v$.value.prepTime.$errors.map((e) => e.$message),
);
const portionsErrors = computed(() =>
  v$.value.portions.$errors.map((e) => e.$message),
);
const ingredientErrors = (index) =>
  v$.value.ingredients[index]
    ? v$.value.ingredients[index].$errors.map((e) => e.$message)
    : [];
const stepErrors = (index) =>
  v$.value.steps[index]
    ? v$.value.steps[index].$errors.map((e) => e.$message)
    : [];

const addIngredient = () => {
  form.value.ingredients.push("");
};

const removeIngredient = (index) => {
  if (index >= 3) {
    form.value.ingredients.splice(index, 1);
  }
};

const addStep = () => {
  form.value.steps.push("");
};

const removeStep = (index) => {
  if (index >= 3) {
    form.value.steps.splice(index, 1);
  }
};

const loadRecipe = async () => {
  try {
    const data = await getRecipe(recipeId);
    form.value = {
      title: data.title,
      type: data.type,
      image: data.image,
      ingredients:
        data.ingredients.length >= 3
          ? data.ingredients
          : [...data.ingredients, "", "", ""],
      steps: data.steps.length >= 3 ? data.steps : [...data.steps, "", "", ""],
      prepTime: data.prepTime,
      portions: data.portions,
    };
  } catch (error) {
    console.error("An error occurred:", error);
    snackbar.value = {
      show: true,
      message:
        error.response?.data?.error ||
        "Failed to load recipe. Please try again.",
      color: "red-darken-4",
    };
  }
};

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    snackbar.value = {
      show: true,
      message: "Please fill in all fields correctly.",
      color: "red-darken-4",
    };
    return;
  }

  try {
    await editRecipe(recipeId, form.value);
    snackbar.value = {
      show: true,
      message: "Recipe updated successfully!",
      color: "green-darken-4",
    };
    setTimeout(() => {
      router.push(`/view-recipe/${recipeId}`);
    }, 1000);
  } catch (error) {
    console.error("An error occurred:", error);
    snackbar.value = {
      show: true,
      message:
        error.response?.data?.error ||
        "Failed to update recipe. Please try again.",
      color: "red-darken-4",
    };
  }
};

onMounted(() => {
  loadRecipe();
});
</script>

<template>
  <h2>Edit Recipe</h2>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="3">
          <v-text-field
            v-model.trim="form.title"
            :error-messages="titleErrors"
            label="Title"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="form.type"
            :items="['food', 'drink']"
            :error-messages="typeErrors"
            label="Type"
            required
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model.trim="form.prepTime"
            :error-messages="prepTimeErrors"
            label="Preparation Time (mins)"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model.trim="form.portions"
            :error-messages="portionsErrors"
            label="Portions"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-text-field
        v-model.trim="form.image"
        :error-messages="imageErrors"
        label="Image URL"
      ></v-text-field>

      <v-row>
        <v-col>
          <v-list>
            <v-list-item
              v-for="(ingredient, index) in form.ingredients"
              :key="index"
            >
              <v-text-field
                v-model.trim="form.ingredients[index]"
                :error-messages="ingredientErrors(index)"
                label="Ingredient"
                required
              ></v-text-field>
              <v-btn
                v-if="index >= 2"
                icon
                @click="addIngredient"
                color="green-darken-4"
                size="x-small"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                v-if="index >= 3"
                icon
                @click="removeIngredient(index)"
                color="red-darken-4"
                size="x-small"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <v-list>
            <v-list-item v-for="(step, index) in form.steps" :key="index">
              <v-text-field
                v-model.trim="form.steps[index]"
                :error-messages="stepErrors(index)"
                label="Step"
                required
              ></v-text-field>
              <v-btn
                v-if="index >= 2"
                icon
                @click="addStep"
                color="green-darken-4"
                size="x-small"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                v-if="index >= 3"
                icon
                @click="removeStep(index)"
                color="red-darken-4"
                size="x-small"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-btn type="submit" color="amber">Update Recipe</v-btn>
      <v-btn color="grey" @click="router.back()">Cancel</v-btn>
    </v-form>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" top>
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.v-container {
  max-width: 1200px;
}
</style>
