const { createApp } = Vue;

createApp({
    data() {
        return {
            name: '',
            email: '',
            message: '',
            showForm: true,
            searchQuery: '',
            doctors: [
                { id: 1, name: 'Dr Joe', image: 'images/team1.jpg', specialty: 'Cardiology' },
                { id: 2, name: 'Dr Smith', image: 'images/team2.jpg', specialty: 'Neurology' },
                { id: 3, name: 'Dr Lee', image: 'images/team3.jpg', specialty: 'Pediatrics' },
                { id: 4, name: 'Dr Brown', image: 'images/team4.jpg', specialty: 'Orthopedics' },
                { id: 5, name: 'Dr Taylor', image: 'images/team5.jpg', specialty: 'Dermatology' },
                { id: 6, name: 'Dr Wilson', image: 'images/team6.jpg', specialty: 'Oncology' }
            ],
            services: [
    { icon: 'images/user-md-symbol.png', title: 'Health Check', description: 'Comprehensive Health Check-Ups.' },
    { icon: 'images/hospital.png', title: 'Inpatient Care', description: '24/7 Hospital Care.' },
    { icon: 'images/heart.png', title: 'Cardiology', description: 'Heart Care Services.' },
    { icon: 'images/dumbbell.png', title: 'Therapy', description: 'Physical and mental therapy.' },
    { icon: 'images/ampoule.png', title: 'Lab Tests', description: 'Advanced diagnostics.' },
    { icon: 'images/stethoscope.png', title: 'Consultations', description: 'Specialist consultations.' }
],
            reviews: [
                { id: 1, name: 'Lara John', image: 'images/pic1.png', rating: 4, text: 'Great service and caring staff!' },
                { id: 2, name: 'Jane Doe', image: 'images/pic2.png', rating: 4, text: 'Highly recommend this hospital!' },
                { id: 3, name: 'Mike Smith', image: 'images/pic3.png', rating: 4, text: 'Excellent care and facilities!' }
            ],
            activeDoctor: null
        };
    },
    methods: {
        submitForm() {
            if (this.name && this.email && this.message) {
                const modal = new bootstrap.Modal(document.getElementById('formModal'));
                modal.show();
                this.name = '';
                this.email = '';
                this.message = '';
                this.showForm = false;
            }
        },
        toggleDoctor(id) {
            this.activeDoctor = this.activeDoctor === id ? null : id;
        }
    },
    computed: {
        filteredDoctors() {
            return this.doctors.filter(doctor =>
                doctor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                doctor.specialty.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    components: {
        'review-card': {
            props: ['review'],
            template: `
                <div class="review-box">
                    <img :src="review.image" :alt="review.name">
                    <h2>{{ review.name }}</h2>
                    <div class="review-stars">
                        <i v-for="n in 5" :class="n <= review.rating ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
                    </div>
                    <div class="review-text">
                        <p>{{ review.text }}</p>
                    </div>
                </div>
            `
        }
    }
}).mount('#app');