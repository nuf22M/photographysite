/* StudioRoutes 3D Hero + Interactions */
(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  if (toggle && menu){
    toggle.addEventListener('click', () => {
      const show = !menu.classList.contains('show');
      menu.classList.toggle('show', show);
      toggle.setAttribute('aria-expanded', String(show));
    });
  }

  // Enhanced navbar on scroll
  const header = document.querySelector('.site-header');
  
  // Cinematic entrance effects for sections
  const sections = document.querySelectorAll('.section, .hero');
  const cards = document.querySelectorAll('.card');
  const services = document.querySelectorAll('.service');
  
  // Set initial positions with modern style - skip hero section
  sections.forEach((section, index) => {
    if (!section.classList.contains('hero')) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(60px) scale(0.95)';
    }
  });
  
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.9)';
  });
  
  services.forEach((service, index) => {
    service.style.opacity = '0';
    service.style.transform = 'translateY(30px) scale(0.9)';
  });
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Add scrolled class when user scrolls down
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Modern elegant entrance for sections (skip hero)
    sections.forEach((section, index) => {
      // Skip hero section - keep it normal
      if (section.classList.contains('hero')) return;
      
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      
      // Calculate when section should appear
      const triggerPoint = windowHeight * 0.85;
      const isVisible = sectionTop < triggerPoint;
      
      if (isVisible) {
        const progress = Math.max(0, Math.min(1, (triggerPoint - sectionTop) / 200));
        
        // Smooth fade-in with subtle movement
        const translateY = 60 - (progress * 60);
        const scale = 0.95 + (progress * 0.05);
        
        section.style.opacity = progress;
        section.style.transform = `translateY(${translateY}px) scale(${scale})`;
      } else {
        // Reset to initial state when not visible
        section.style.opacity = '0';
        section.style.transform = 'translateY(60px) scale(0.95)';
      }
    });
    
    // Modern staggered entrance for cards
    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top;
      
      const triggerPoint = windowHeight * 0.85;
      const isVisible = cardTop < triggerPoint;
      
      if (isVisible) {
        const progress = Math.max(0, Math.min(1, (triggerPoint - cardTop) / 150));
        const delay = (index % 6) * 0.05; // Reduced delay
        const adjustedProgress = Math.max(0, progress - delay);
        
        // Ensure all cards are fully visible
        if (adjustedProgress > 0.1) {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0px) scale(1)';
        } else {
          card.style.opacity = adjustedProgress;
          card.style.transform = `translateY(${40 - (adjustedProgress * 40)}px) scale(${0.9 + (adjustedProgress * 0.1)})`;
        }
      } else {
        // Reset to initial state when not visible
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px) scale(0.9)';
      }
    });
    
    // Modern staggered entrance for services
    services.forEach((service, index) => {
      const rect = service.getBoundingClientRect();
      const serviceTop = rect.top;
      
      const triggerPoint = windowHeight * 0.85;
      const isVisible = serviceTop < triggerPoint;
      
      if (isVisible) {
        const progress = Math.max(0, Math.min(1, (triggerPoint - serviceTop) / 150));
        const delay = (index % 3) * 0.05; // Reduced delay
        const adjustedProgress = Math.max(0, progress - delay);
        
        // Ensure all services are fully visible
        if (adjustedProgress > 0.1) {
          service.style.opacity = '1';
          service.style.transform = 'translateY(0px) scale(1)';
        } else {
          service.style.opacity = adjustedProgress;
          service.style.transform = `translateY(${30 - (adjustedProgress * 30)}px) scale(${0.9 + (adjustedProgress * 0.1)})`;
        }
      } else {
        // Reset to initial state when not visible
        service.style.opacity = '0';
        service.style.transform = 'translateY(30px) scale(0.9)';
      }
    });
  });

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;
      const el = document.querySelector(id);
      if (el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Subtle tilt on elements
  const tiltEls = Array.from(document.querySelectorAll('.tilt'));
  window.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const rx = ((e.clientY / h) - 0.5) * -6;
    const ry = ((e.clientX / w) - 0.5) * 6;
    for (const el of tiltEls){
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  });

  // THREE.js 3D scene
  const canvas = document.getElementById('bg3d');
  if (!canvas || !window.THREE){ return; }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Create eye-catching animated background
  const backgroundContainer = document.createElement('div');
  backgroundContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    background: linear-gradient(45deg, #0a0a0a, #1a0a0a, #0a0a1a, #1a0a1a);
    background-size: 400% 400%;
    animation: gradientShift 8s ease infinite;
  `;
  document.body.appendChild(backgroundContainer);
  
  // Add animated particles to background
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: ${Math.random() > 0.5 ? '#ff2d2d' : '#0066ff'};
      border-radius: 50%;
      opacity: ${Math.random() * 0.8 + 0.2};
      animation: float ${Math.random() * 10 + 10}s linear infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    backgroundContainer.appendChild(particle);
  }
  
  // Add a central glowing element instead of video
  const centralGlow = document.createElement('div');
  centralGlow.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    z-index: -1;
    pointer-events: none;
    background: radial-gradient(circle, rgba(255,45,45,0.3) 0%, rgba(255,45,45,0.1) 50%, transparent 70%);
    border-radius: 50%;
    animation: pulse 4s ease-in-out infinite;
  `;
  document.body.appendChild(centralGlow);
  
  // Background is now ready

  // Particles
  const COUNT = 1200;
  const pos = new Float32Array(COUNT * 3);
  for (let i=0;i<COUNT;i++){
    const r = 8 * Math.random() + 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i*3+0] = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i*3+2] = r * Math.cos(phi);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.012, transparent:true, opacity:0.85 });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // Enhanced lighting for 3D camera effect
  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  
  // Main directional light
  const dl = new THREE.DirectionalLight(0xff2d2d, 1.5);
  dl.position.set(2, 4, 3);
  scene.add(dl);
  
  // Additional rim lighting
  const rimLight = new THREE.DirectionalLight(0x0066ff, 0.8);
  rimLight.position.set(-2, 2, -3);
  scene.add(rimLight);
  
  // Point light for camera glow
  const pointLight = new THREE.PointLight(0xff2d2d, 1.0, 10);
  pointLight.position.set(0, 0, 2);
  scene.add(pointLight);

  // Parallax camera
  const target = { x:0, y:0 };
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    target.x = x * 0.6;
    target.y = y * -0.4;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animate
  const clock = new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Animate central glow
    const glowScale = 1 + Math.sin(t * 0.5) * 0.2;
    centralGlow.style.transform = `translate(-50%, -50%) scale(${glowScale})`;
    
    points.rotation.y = t * 0.03;

    camera.position.x += (target.x - camera.position.x) * 0.05;
    camera.position.y += (target.y - camera.position.y) * 0.05;
    camera.lookAt(0,0,0);

    renderer.render(scene, camera);
  }
  animate();
  
  // Initialize main collage like counts on page load
  updateMainCollageLikes();
})();

// Switch between albums
function switchAlbum(albumId) {
  const title = document.getElementById('albumTitle');
  const likeCount = document.getElementById('albumLikeCount');
  const viewCount = document.getElementById('albumViewCount');
  
  // Set album title based on ID
  const albumTitles = {
    'album1': 'Isuri × Danuka | Colombo',
    'album2': 'Naveen × Shehani | Kandy',
    'album3': 'Kaveen × Harini | Galle',
    'album4': 'Amir × Roshni | Negombo',
    'album5': 'Arun × Dulani | Nuwara Eliya',
    'album6': 'Jason × Maya | Colombo'
  };
  
  title.textContent = albumTitles[albumId] || 'Album';
  
  // Get real stats from localStorage
  const albumStats = JSON.parse(localStorage.getItem('albumStats') || '{}');
  const currentAlbumStats = albumStats[albumId] || { likes: 0, views: 0 };
  
  likeCount.textContent = currentAlbumStats.likes;
  viewCount.textContent = currentAlbumStats.views;
  
  // Increment view count
  currentAlbumStats.views++;
  albumStats[albumId] = currentAlbumStats;
  localStorage.setItem('albumStats', JSON.stringify(albumStats));
  
  // Set active album in sidebar
  setActiveAlbum(albumId);
  
  // Update main collage like counts
  updateMainCollageLikes();
  
  // Highlight current album in main collage
  highlightCurrentAlbum(albumId);
}

// Highlight current album in main collage
function highlightCurrentAlbum(albumId) {
  // Remove highlight from all collage items
  document.querySelectorAll('.collage-item').forEach(item => {
    item.classList.remove('current-album');
  });
  
  // Add highlight to current album
  const currentCollageItem = document.querySelector(`[onclick*="${albumId}"]`);
  if (currentCollageItem) {
    currentCollageItem.classList.add('current-album');
  }
}

// Set active album in sidebar
function setActiveAlbum(albumId) {
  // Remove active class from all thumbnails
  document.querySelectorAll('.album-thumbnail').forEach(thumb => {
    thumb.classList.remove('active');
  });
  
  // Add active class to current album
  const activeThumb = document.querySelector(`[data-album="${albumId}"]`);
  if (activeThumb) {
    activeThumb.classList.add('active');
  }
}

// Update main collage like counts
function updateMainCollageLikes() {
  const albumStats = JSON.parse(localStorage.getItem('albumStats') || '{}');
  
  document.querySelectorAll('.like-count-main').forEach(element => {
    const albumId = element.getAttribute('data-album');
    const stats = albumStats[albumId] || { likes: 0 };
    element.textContent = stats.likes;
  });
  
  // Update sidebar thumbnail likes
  document.querySelectorAll('.thumb-like-count').forEach(element => {
    const albumId = element.getAttribute('data-album');
    const stats = albumStats[albumId] || { likes: 0 };
    element.textContent = stats.likes;
  });
}

// Album popup functionality
function openAlbum(albumId) {
  console.log('Opening album:', albumId);
  const popup = document.getElementById('albumPopup');
  const title = document.getElementById('albumTitle');
  const likeCount = document.getElementById('albumLikeCount');
  const viewCount = document.getElementById('albumViewCount');
  
  if (!popup) {
    console.error('Album popup not found!');
    return;
  }
  
  // Set album title based on ID
  const albumTitles = {
    'album1': 'Isuri × Danuka | Colombo',
    'album2': 'Naveen × Shehani | Kandy',
    'album3': 'Kaveen × Harini | Galle',
    'album4': 'Amir × Roshni | Negombo',
    'album5': 'Arun × Danuka | Nuwara Eliya',
    'album6': 'Jason × Maya | Colombo'
  };
  
  title.textContent = albumTitles[albumId] || 'Album';
  
  // Get real stats from localStorage or set to 0
  const albumStats = JSON.parse(localStorage.getItem('albumStats') || '{}');
  const currentAlbumStats = albumStats[albumId] || { likes: 0, views: 0 };
  
  likeCount.textContent = currentAlbumStats.likes;
  viewCount.textContent = currentAlbumStats.views;
  
  // Increment view count
  currentAlbumStats.views++;
  albumStats[albumId] = currentAlbumStats;
  localStorage.setItem('albumStats', JSON.stringify(albumStats));
  
  popup.style.display = 'block';
  popup.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  console.log('Popup should be visible now');
  
  // Update main collage like counts
  updateMainCollageLikes();
  
  // Set active album in sidebar
  setActiveAlbum(albumId);
  
  // Highlight current album in main collage
  highlightCurrentAlbum(albumId);
}

function closeAlbum() {
  const popup = document.getElementById('albumPopup');
  popup.style.display = 'none';
  popup.classList.remove('show');
  document.body.style.overflow = 'auto';
}

// Highlight liked photo in popup
function highlightLikedPhoto(albumItem) {
  // Remove highlight from all photos
  document.querySelectorAll('.album-item').forEach(item => {
    item.classList.remove('current-photo');
  });
  
  // Add highlight to liked photo
  albumItem.classList.add('current-photo');
}

// Remove photo highlight
function removePhotoHighlight(albumItem) {
  albumItem.classList.remove('current-photo');
}

// Close popup when clicking outside
document.getElementById('albumPopup').addEventListener('click', function(e) {
  if (e.target === this) {
    closeAlbum();
  }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAlbum();
  }
});

// Like functionality
function toggleLike(btn) {
  const likeIcon = btn.querySelector('.like-icon');
  const likeCount = btn.querySelector('.like-count');
  let currentCount = parseInt(likeCount.textContent);
  
  btn.classList.toggle('liked');
  if (btn.classList.contains('liked')) {
    likeIcon.textContent = '❤️';
    likeCount.textContent = currentCount + 1;
    
    // Highlight the liked photo
    const albumItem = btn.closest('.album-item');
    highlightLikedPhoto(albumItem);
  } else {
    likeIcon.textContent = '🤍';
    likeCount.textContent = currentCount - 1;
    
    // Remove highlight from unliked photo
    const albumItem = btn.closest('.album-item');
    removePhotoHighlight(albumItem);
  }
}

// Share functionality
function sharePhoto(btn) {
  const albumItem = btn.closest('.album-item');
  const imageUrl = albumItem.style.backgroundImage.slice(5, -2);
  
  if (navigator.share) {
    navigator.share({
      title: 'StudioRoutes Wedding Photo',
      text: 'Check out this beautiful wedding photo!',
      url: window.location.href
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    });
  }
}



// Helper function to get album ID from title
function getAlbumIdFromTitle(title) {
  const albumTitles = {
    'Isuri × Danuka | Colombo': 'album1',
    'Naveen × Shehani | Kandy': 'album2',
    'Kaveen × Harini | Galle': 'album3',
    'Amir × Roshni | Negombo': 'album4',
    'Arun × Dulani | Nuwara Eliya': 'album5',
    'Jason × Maya | Colombo': 'album6'
  };
  return albumTitles[title] || 'album1';
}



// Update likes when album is liked/unliked
function toggleAlbumLike() {
  const btn = document.querySelector('.like-album-btn');
  const likeIcon = btn.querySelector('.album-like-icon');
  const likeText = btn.querySelector('.album-like-text');
  const likeCount = document.getElementById('albumLikeCount');
  const albumTitle = document.getElementById('albumTitle').textContent;
  
  // Get current album ID from title
  const albumId = getAlbumIdFromTitle(albumTitle);
  
  // Get current stats
  const albumStats = JSON.parse(localStorage.getItem('albumStats') || '{}');
  const currentAlbumStats = albumStats[albumId] || { likes: 0, views: 0 };
  
  btn.classList.toggle('liked');
  if (btn.classList.contains('liked')) {
    likeIcon.textContent = '❤️';
    likeText.textContent = 'Liked';
    currentAlbumStats.likes++;
  } else {
    likeIcon.textContent = '🤍';
    likeText.textContent = 'Like';
    currentAlbumStats.likes--;
  }
  
  likeCount.textContent = currentAlbumStats.likes;
  albumStats[albumId] = currentAlbumStats;
  localStorage.setItem('albumStats', JSON.stringify(albumStats));
  
  // Update main collage like count
  updateMainCollageLikes();
}
