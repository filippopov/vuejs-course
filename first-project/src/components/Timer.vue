<template>
    <div>

        <slot name="person" v-bind:person="person"></slot>
        <slot name="message"></slot>
        <h1>{{message}}</h1>
        <p>{{number}}</p>
        <ul v-if="numbers.length">
            <li v-for="(number, index) in numbers">{{number}}</li>
        </ul>
        <h1>{{initial}}</h1>
        <slot></slot>
        <span>{{name}}</span>
        <br>
        <span>{{time}}</span>
        <button @click="onStartClick">{{buttonName}}</button>
    </div>
</template>

<script>
    import eventBus from '../tools/eventBus'
    export default {
        data() {
            return {
                // name: 'Pesho',
                person: {
                    name: 'Pesho12',
                    age: 21
                },
                time: 0,
                isStarted: false,
                intervalId: 0
            }
        },
        computed: {
            buttonName(){
                return this.isStarted ? 'Stop' : 'Start'
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
            numbers: Array,
            initial: Number,
            name: String
        },
        methods: {
            onStartClick() {
                if (this.isStarted) {
                    clearInterval(this.intervalId);

                    this.isStarted = false;

                    this.$root.$emit('timer-stopped', {name: this.name, time: this.time});

                    this.time = 0;
                    this.intervalId = 0;
                } else {
                    this.intervalId = setInterval(() => this.time++, 1000);
                    this.isStarted = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>