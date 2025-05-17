document.addEventListener('DOMContentLoaded', function() {
    // Sample destination data
    const destinations = [
        { id: 1, name: 'Paris, France', type: 'city', price: 1200, rating: 4.8, image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' },
        { id: 2, name: 'Bali, Indonesia', type: 'beach', price: 950, rating: 4.9, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80' },
        { id: 3, name: 'Tokyo, Japan', type: 'city', price: 1500, rating: 4.7, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80' },
        { id: 4, name: 'Swiss Alps, Switzerland', type: 'mountain', price: 1800, rating: 4.9, image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&ixid=M3wxMLjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80' },
        { id: 5, name: 'New York, USA', type: 'city', price: 1300, rating: 4.6, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' },
        { id: 6, name: 'Santorini, Greece', type: 'beach', price: 1100, rating: 4.8, image: 'https://images.unsplash.com/photo-1531707379617-59ab1a6b4e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80' },
        { id: 7, name: 'Patagonia, Argentina', type: 'adventure', price: 2000, rating: 4.9, image: 'https://images.unsplash.com/photo-1582972236019-ea9eab4c81a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' },
        { id: 8, name: 'Rome, Italy', type: 'city', price: 1000, rating: 4.7, image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80' }
    ];

    // DOM Elements
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const switchToSignup = document.querySelector('.switch-to-signup');
    const switchToLogin = document.querySelector('.switch-to-login');
    const searchBar = document.querySelector('.search-bar input');
    const destinationGrid = document.querySelector('.destination-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const destinationSelect = document.getElementById('destination-select');
    const addDestinationBtn = document.querySelector('.add-destination-btn');
    const destinationList = document.querySelector('.destination-list');
    const saveBtn = document.querySelector('.save-btn');
    const tripNameInput = document.getElementById('trip-name');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const previewTripName = document.getElementById('preview-trip-name');
    const previewTripDates = document.getElementById('preview-trip-dates');
    const weatherSearchBtn = document.querySelector('.weather-search-btn');
    const weatherLocationInput = document.getElementById('weather-location');
    const weatherDisplay = document.querySelector('.weather-display');
    const testimonialSlides = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Current trip data
    let currentTrip = {
        name: '',
        startDate: '',
        endDate: '',
        destinations: []
    };

    // Testimonial slider
    let currentSlide = 0;

    // Initialize the app
    function init() {
        renderDestinations(destinations);
        populateDestinationSelect(destinations);
        setupEventListeners();
        showSlide(currentSlide);
    }

    // Set up event listeners
    function setupEventListeners() {
        // Modal controls
        loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
        signupBtn.addEventListener('click', () => signupModal.classList.add('active'));
        
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal').classList.remove('active');
            });
        });

        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
        });

        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
        });

        // Search functionality
        searchBar.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm.length > 0) {
                const filtered = destinations.filter(dest => 
                    dest.name.toLowerCase().startsWith(searchTerm)
                );
                renderDestinations(filtered);
            } else {
                renderDestinations(destinations);
            }
        });

        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.textContent.toLowerCase();
                if (filter === 'all') {
                    renderDestinations(destinations);
                } else {
                    const filtered = destinations.filter(dest => 
                        dest.type === filter
                    );
                    renderDestinations(filtered);
                }
            });
        });

        // Trip planner
        tripNameInput.addEventListener('input', updateTripPreview);
        startDateInput.addEventListener('change', updateTripPreview);
        endDateInput.addEventListener('change', updateTripPreview);
        
        addDestinationBtn.addEventListener('click', addDestinationToTrip);
        saveBtn.addEventListener('click', saveTrip);

        // Weather widget
        weatherSearchBtn.addEventListener('click', getWeather);

        // Testimonial slider
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Mobile menu
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

        // Form submissions
        document.querySelector('#login-modal form').addEventListener('submit', handleLogin);
        document.querySelector('#signup-modal form').addEventListener('submit', handleSignup);
        document.querySelector('.newsletter-form').addEventListener('submit', handleNewsletter);
    }

    // Render destinations to the grid
    function renderDestinations(dests) {
        destinationGrid.innerHTML = '';
        
        if (dests.length === 0) {
            destinationGrid.innerHTML = '<p class="no-results">No destinations found. Try a different search.</p>';
            return;
        }

        dests.forEach(dest => {
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}" class="destination-img">
                <div class="destination-info">
                    <h3>${dest.name}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                    <div class="destination-meta">
                        <span class="destination-price">$${dest.price}</span>
                        <span class="destination-rating">
                            <i class="fas fa-star"></i> ${dest.rating}
                        </span>
                    </div>
                </div>
            `;
            destinationGrid.appendChild(card);
        });
    }

    // Populate destination select dropdown
    function populateDestinationSelect(dests) {
        destinationSelect.innerHTML = '<option value="">Select a destination</option>';
        dests.forEach(dest => {
            const option = document.createElement('option');
            option.value = dest.id;
            option.textContent = dest.name;
            destinationSelect.appendChild(option);
        });
    }

    // Update trip preview
    function updateTripPreview() {
        currentTrip.name = tripNameInput.value;
        currentTrip.startDate = startDateInput.value;
        currentTrip.endDate = endDateInput.value;

        previewTripName.textContent = currentTrip.name || 'My Trip';
        
        if (currentTrip.startDate && currentTrip.endDate) {
            const start = new Date(currentTrip.startDate).toLocaleDateString();
            const end = new Date(currentTrip.endDate).toLocaleDateString();
            previewTripDates.textContent = ${start} - ${end};
        } else {
            previewTripDates.textContent = 'Dates not set';
        }

        updateSaveButton();
    }

    // Add destination to trip
    function addDestinationToTrip() {
        const selectedId = destinationSelect.value;
        if (!selectedId) return;

        const destination = destinations.find(dest => dest.id == selectedId);
        if (!destination) return;

        // Check if already added
        if (currentTrip.destinations.some(dest => dest.id == selectedId)) {
            alert('This destination is already in your trip!');
            return;
        }

        currentTrip.destinations.push(destination);
        renderDestinationList();
        updateSaveButton();
    }

    // Render destination list in itinerary
    function renderDestinationList() {
        destinationList.innerHTML = '';

        if (currentTrip.destinations.length === 0) {
            destinationList.innerHTML = '<li class="empty-message">No destinations added yet</li>';
            return;
        }

        currentTrip.destinations.forEach(dest => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${dest.name}</span>
                <span class="remove-destination" data-id="${dest.id}"><i class="fas fa-times"></i></span>
            `;
            destinationList.appendChild(li);
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-destination').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.remove-destination').dataset.id;
                currentTrip.destinations = currentTrip.destinations.filter(dest => dest.id != id);
                renderDestinationList();
                updateSaveButton();
            });
        });
    }

    // Update save button state
    function updateSaveButton() {
        const canSave = currentTrip.name && 
                       currentTrip.startDate && 
                       currentTrip.endDate && 
                       currentTrip.destinations.length > 0;
        
        saveBtn.disabled = !canSave;
    }

    // Save trip
    function saveTrip() {
        // In a real app, you would save to a database
        alert(Trip "${currentTrip.name}" saved successfully!\n\nDestinations: ${currentTrip.destinations.map(d => d.name).join(', ')});
        
        // Reset trip
        currentTrip = {
            name: '',
            startDate: '',
            endDate: '',
            destinations: []
        };
        
        tripNameInput.value = '';
        startDateInput.value = '';
        endDateInput.value = '';
        destinationSelect.value = '';
        
        updateTripPreview();
        renderDestinationList();
    }

    // Get weather data
    async function getWeather() {
        const location = weatherLocationInput.value.trim();
        if (!location) return;

        // In a real app, you would call a weather API
        // This is a mock implementation
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Mock data
            const weatherData = {
                location: location,
                description: 'Partly cloudy',
                temp: Math.floor(Math.random() * 15) + 15, // Random temp between 15-30
                humidity: Math.floor(Math.random() * 50) + 30, // Random humidity between 30-80
                wind: Math.floor(Math.random() * 20) + 5, // Random wind between 5-25
                icon: ['sun', 'cloud', 'cloud-rain', 'cloud-sun'][Math.floor(Math.random() * 4)] // Random icon
            };

            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather:', error);
            weatherDisplay.innerHTML = '<p class="error">Could not fetch weather data. Please try again.</p>';
        }
    }

    // Display weather data
    function displayWeather(data) {
        const iconClass = {
            sun: 'fas fa-sun',
            cloud: 'fas fa-cloud',
            'cloud-rain': 'fas fa-cloud-rain',
            'cloud-sun': 'fas fa-cloud-sun'
        }[data.icon] || 'fas fa-sun';

        weatherDisplay.innerHTML = `
            <div class="weather-card">
                <div class="weather-icon"><i class="${iconClass}"></i></div>
                <div class="weather-info">
                    <h3 class="weather-location">${data.location}</h3>
                    <p class="weather-description">${data.description}</p>
                    <div class="weather-temp">${data.temp}°C</div>
                    <div class="weather-details">
                        <span class="humidity"><i class="fas fa-tint"></i> ${data.humidity}%</span>
                        <span class="wind"><i class="fas fa-wind"></i> ${data.wind} km/h</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Testimonial slider
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialSlides[index].classList.add('active');
        
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    }

    // Form handlers
    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // In a real app, you would validate and send to server
        alert(Login attempt with email: ${email});
        loginModal.classList.remove('active');
        
        // Clear form
        e.target.reset();
    }

    function handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        
        // Simple validation
        if (password !== confirm) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real app, you would validate and send to server
        alert(Signup attempt for: ${name} (${email}));
        signupModal.classList.remove('active');
        
        // Clear form
        e.target.reset();
    }

    function handleNewsletter(e) {
        e.preventDefault();
        const email = e.target.querySelector('input').value;
        
        // In a real app, you would send to server
        alert(Thanks for subscribing with: ${email});
        e.target.reset();
    }

    // Initialize the app
    init();
});
