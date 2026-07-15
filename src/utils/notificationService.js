const shownNotifications = new Set();

export const requestNotificationPermission = async () => {

    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {

        await Notification.requestPermission();

    }

};

export const showNotification = (

    title,

    body,

    id

) => {

    if (Notification.permission !== "granted") return;

    if (shownNotifications.has(id)) return;

    shownNotifications.add(id);

    const notification = new Notification(title, {

        body,

        icon: "/logo192.png"

    });

    const audio = new Audio("/notification.mp3");

    audio.play().catch(() => { });

    notification.onclick = () => {

        window.focus();

    };

};