<template>
    <div id="app">
        {{testMessage | reverse | newReverse | hiFromMixin}}
        <timer :message="timerMessage" :number="150" :numbers="[1]" :initial="150" name="eventBus">
            <p>test</p>
            <template #person="slotProps">
                <h2>{{slotProps.person.name}} {{slotProps.person.age}}</h2>
            </template>
            <template v-slot:message>
                {{msg}}
            </template>
        </timer>
        <Log></Log>
    </div>
</template>



<script>
import Timer from './components/Timer'
import Log from './components/Log'
import {formatingMixin} from './mixins/formatMixins'

export default {
    name: 'app',
    data() {
        return {
            msg: 'Hi',
            name: 'Gosho',
            testMessage: 'testt'
        }
    },
    components: {
        Timer,
        Log
    },
    computed: {
        timerMessage() {
            return 'Hi Popov ' + this.msg;
        }
    },
    filters: {
        newReverse(value) {
            return value.split('').reverse().join('');
        }
    },
    mixins: [formatingMixin]
}
</script>

<style>

</style>
