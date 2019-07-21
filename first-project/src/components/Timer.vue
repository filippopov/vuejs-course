<template>
    <div>
        <slot name="person" v-bind:person="person"></slot>
        <slot name="message"></slot>
        <h1>{{message}}</h1>
        <p>{{number}}</p>
        <ul v-if="numbers.length">
            <li v-for="(number, index) in numbers">{{number}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'Pesho',
                person: {
                    name: 'Pesho12',
                    age: 21,
                }
            }
        },
        props: {
            message: {
                type: String,
                required: true,
                default: 'Default Message',
                validator: m => m.length > 10
            },
            number: Number,
            numbers: Array
        }
    }
</script>

<style scoped>

</style>