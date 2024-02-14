<template>
  <div class="fundo">
    <v-container align="center" justify="center" class="pt-16 mt-16">
      <slot>
        <v-col cols="12" sm="8" md="4">
          <v-card color="#121212" class="text-center" elevation="8">
            <v-card-title>
              <h3 class="display-2">Área dos Sócios</h3>
            </v-card-title>
            <v-card-text>
              <v-text-field type="email" label="Login"/>
              <v-text-field type="password" label="Senha"/>
            </v-card-text>
            <v-card-actions>
              <v-btn class="bg-secondary" block>Entrar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </slot>
    </v-container>
  </div>
</template>

<script>

</script>

<style scoped>
.fundo {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url('https://daily.jstor.org/wp-content/uploads/2018/06/soccer_europe_1050x700.jpg') no-repeat center center;
  background-size: cover;
}
</style>