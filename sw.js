self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("love-app-v1").then(cache => {
      return cache.addAll([
        "/",
        "index.html",
        "index1.html",
        "calendar-app.html",
        "messages-app.html",
        "music-app.html",
        "notes-app.html",
        "photos-app.html",
        "weather-app.html",
        "style.css",
        "manifest.json",
        "sw.js",
        "photos-list.js",
        "photos-list.json",
        "song/playlist.js",
        "song/playlist.json",
        "img/background.jpeg",
        "img/background1.jpeg",
        "img/icon.png",
        "img/image.jpeg",
        "img/photo1.jpeg",
        "img/photo2.jpeg",
        "img/video.mp4",
        "music.mp3",
        "Ludovico Einaudi - Experience (Official Visualizer).mp3",
        "song/Muboriz_Usmonov_Rustam_Azimi_-_Surayo_79991422.mp3",
        "song/Rustam_Azimi_-_Ajab_Tozai_79762391.mp3",
        "song/Rustam_Azimi_-_Bevafo_79961027.mp3",
        "song/Rustam_Azimi_-_Du-Du_79994599.mp3",
        "song/Rustam_Azimi_-_Dukhtari_Chupon_79934547.mp3",
        "song/Rustam_Azimi_-_Dunyoi_Ishq_80215010.mp3",
        "song/Rustam_Azimi_-_Duston_79994578.mp3",
        "song/Rustam_Azimi_-_Ey_Dust_80351984.mp3",
        "song/Rustam_Azimi_-_Girya_Nakun_81166447.mp3",
        "song/Rustam_Azimi_-_Imshab_79779000.mp3",
        "song/Rustam_Azimi_-_Kabki_Dari_80479838.mp3",
        "song/Rustam_Azimi_-_Khushkhiromon_79934546.mp3",
        "song/Rustam_Azimi_-_Maryam_79779016.mp3",
        "song/Rustam_Azimi_-_Mastam_80434551.mp3",
        "song/Rustam_Azimi_-_Mastam_80473743.mp3",
        "song/Rustam_Azimi_-_Modar_79519428.mp3",
        "song/Rustam_Azimi_-_Modar_79779020.mp3",
        "song/Rustam_Azimi_-_Navruz_81086937.mp3",
        "song/Rustam_Azimi_-_Nigora_79515394.mp3",
        "song/Rustam_Azimi_-_Nimai_Jon_80215014.mp3",
        "song/Rustam_Azimi_-_Nosazo_79961031.mp3",
        "song/Rustam_Azimi_-_Nozanin_80528582.mp3",
        "song/Rustam_Azimi_-_Odate_79579345.mp3",
        "song/Rustam_Azimi_-_Orom-Orom_Biyo_79542618.mp3",
        "song/Rustam_Azimi_-_Panjara_79400632.mp3",
        "song/Rustam_Azimi_-_Pushaymonam_79400620.mp3",
        "song/Rustam_Azimi_-_Raqsi_Yor_81200102.mp3",
        "song/Rustam_Azimi_-_Sabza_Ba_Noz_80461275.mp3",
        "song/Rustam_Azimi_-_Shahlo_79400592.mp3",
        "song/Rustam_Azimi_-_Soyai_Dasti_Padar_79910907.mp3",
        "song/Rustam_Azimi_-_Yod_Kardam_80412446.mp3",
        "song/Rustam_Azimi_-_Zam-Zama_80473745.mp3"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});