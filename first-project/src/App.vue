<template>
    <div id="app">
        <timer :message="timerMessage" :number="150" :numbers="[1]">
            <template v-slot:person="slotProps">
                <h2>{{slotProps.person.name}} {{slotProps.person.age}}</h2>
            </template>
            <template v-slot:message>
                {{msg}}
            </template>
        </timer>
    </div>
</template>



<script>
import Timer from './components/Timer'

export default {
    name: 'app',
    data() {
        return {
            msg: 'Hi',
            name: 'Gosho',
        }
    },
    components: {
        Timer
    },
    computed: {
        timerMessage() {
            return 'Hi Popov ' + this.msg;
        }
    }
}
</script>

<style>

</style>
