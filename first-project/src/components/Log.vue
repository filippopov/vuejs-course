<template>
    <div>
        <h1>Log component</h1>
        <ul>
            <li v-for="(record, index) in records" :key="index">{{record.name}} {{record.time}}</li>
        </ul>
    </div>
</template>

<script>
    import eventBus from '../tools/eventBus'

    export default {
        data () {
            return {
                records: []
            }
        },
        methods: {
            onTimerStopped(eventData) {
                this.records.push(eventData);
            }
        },
        created() {
            this.$root.$on('timer-stopped', this.onTimerStopped);
        }
    }
</script>