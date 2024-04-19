document.addEventListener('DOMContentLoaded', function() {
    function updateClockAndGreeting() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('clock').textContent = `${hours}:${minutes}`;

        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        const date = now.toLocaleDateString('en-US', options);
        document.getElementById('date').textContent = date;

        let greetingText = 'Good Day';
        if (hours < 12) {
            greetingText = 'Good Morning';
        } else if (hours >= 18) {
            greetingText = 'Good Evening';
        }
        document.getElementById('greeting').textContent = greetingText;
    }

    function setBackground(imageUrl) {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
    }

    function updateBackground() {
        var currentValue = parseInt(numberElement.textContent, 10);
        var imageUrl;

        switch (currentValue) {
            case 1:
                imageUrl = "";
                document.body.style.backgroundColor = "black";
                break;
            case 2:
                imageUrl = "https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-7680x4320-8324.png";
                break;
            case 3:
                imageUrl = "https://wallpapers.com/images/hd/high-quality-black-wood-texture-po65aj0bvhhkppwa.jpg";
                break;
            case 4:
                imageUrl = "https://www.chromethemer.com/wallpapers/chromebook-wallpapers/images/960/dark-paladin-chromebook-wallpaper.jpg";
                break;
            case 5:
                imageUrl = "https://wallpaperengine.info/wp-content/uploads/2019/04/756%D0%BD%D0%BA%D0%B5%D0%B0%D1%80%D0%BF.png";
                break;
            default:
                imageUrl = "";
        }

        setBackground(imageUrl);
        localStorage.setItem('backgroundImage', imageUrl);
    }

    var savedBackground = localStorage.getItem('backgroundImage');
    if (savedBackground) {
        setBackground(savedBackground);
    }

    updateClockAndGreeting();
    setInterval(updateClockAndGreeting, 1000);

    var colorPicker = document.getElementById('colorPicker');
    var settingsContainer = document.querySelector('.settings-container');
    var toggleButton = document.getElementById('toggle-settings');

    colorPicker.addEventListener('input', function() {
        var selectedColor = this.value;
        settingsContainer.style.borderColor = selectedColor;
        toggleButton.style.borderColor = selectedColor;
        document.querySelectorAll('.thumbnail, #clock, #greeting, #date, .search-box input[type="text"]').forEach(function(el) {
            el.style.color = selectedColor;
            el.style.borderColor = selectedColor;
        });
    });

    document.querySelector('.search-box').addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('search-input').value;
        const searchUrl = 'https://www.google.com/search?q=' + encodeURIComponent(query);
        window.location.href = searchUrl;
    });

    var numberElement = document.getElementById('number');
    var decreaseButton = document.getElementById('decrease');
    var increaseButton = document.getElementById('increase');

    decreaseButton.addEventListener('click', function() {
        var currentValue = parseInt(numberElement.textContent, 10);
        if (currentValue > 1) {
            numberElement.textContent = currentValue - 1;
            updateBackground();
        }
    });

    increaseButton.addEventListener('click', function() {
        var currentValue = parseInt(numberElement.textContent, 10);
        if (currentValue < 5) {
            numberElement.textContent = currentValue + 1;
            updateBackground();
        }
    });

    toggleButton.addEventListener('click', function() {
        if (settingsContainer.style.display === 'block') {
            settingsContainer.style.display = 'none';
            toggleButton.textContent = 'Show Meny';
        } else {
            settingsContainer.style.display = 'block';
            toggleButton.textContent = 'Hide Meny';
        }
    });

    toggleButton.textContent = settingsContainer.style.display === 'block' ? 'Hide Meny' : 'Show Meny';
});
