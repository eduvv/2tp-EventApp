
<template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-title>
                Add new event
            </v-card-title>
            <v-card-text>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    
}
</script>

<style>

</style>
