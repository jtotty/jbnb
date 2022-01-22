<template>
    <div style="text-align: center;">
        <img src="https://c.tenor.com/TUJ_WGkQ6pcAAAAC/dog-computer.gif"><br>
        <h1>Error!</h1>
        <p>{{ error.message }} {{ error.statusCode }}</p>
    </div>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            required: true
        }
    },

    head() {
        return {
            title: 'Big Problem!'
        }
    }
}
</script>
