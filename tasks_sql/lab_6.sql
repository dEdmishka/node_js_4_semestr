-- 1. Список усіх користувачів із їхніми каналами з вказаними полями,
-- відсортований за датою створення каналу (новіші вгорі): 
-- user id, user name, user avatar, channel photo, channel description, channel creation date.
SELECT u.id, u.name, u.avatar_url, ch.photo_url, ch.description, ch.created_at
FROM channels ch JOIN users u ON u.id = ch.user_id;

-- 2. Дані про 5 відео, які найбільше сподобалися.
SELECT v.title, v.id, v.description, v.duration, COUNT(*) as v_count
FROM likes l JOIN videos v ON v.id = l.video_id WHERE l.positive = true GROUP BY v.id ORDER BY v_count DESC LIMIT 5;

-- 3. Список відео із такими полями: 
-- video id, video title, video preview, video duration, video publish date, 
-- взятий із підписок користувача Stephanie Bulger, упорядкований за датою публікації (новіші вгорі).
SELECT v.title, v.id, v.preview_url, v.duration, v.published_at  FROM videos v
JOIN likes l ON v.id = l.video_id
JOIN users u ON u.id = l.user_id
JOIN subscriptions s ON s.user_id = u.id
WHERE u.name LIKE 'Stephanie Bulger'
ORDER BY v.published_at DESC;

-- 4. Дані каналу з ідентифікатором '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76' і кількість його підписників.
SELECT ch.id, ch.user_id, ch.description, COUNT(*) as subscribers_total FROM channels ch
JOIN subscriptions s ON s.channel_id = ch.id
WHERE ch.id = '79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76'
GROUP BY ch.id
ORDER BY ch.id DESC;

-- 5. Список із 10 найбільш оцінюваних відео (позитивні/негативні оцінки із тбл. likes), ---
-- починаючи з вересня 2021 року, серед тих відео, що мають понад 4 позитивні оцінки, 
-- відсортований за кількістю оцінок (найбільше угорі).
SELECT v.title, v.id, v.published_at, COUNT(*) as v_count FROM likes l JOIN videos v ON v.id = l.video_id,
	   (SELECT videos.id, COUNT(*) as like_count FROM likes JOIN videos ON videos.id = likes.video_id
	   WHERE likes.positive = true GROUP BY videos.id HAVING COUNT(*) > 4)
	   AS totals
	   WHERE v.published_at >= '2021-09-01' AND totals.id = v.id GROUP BY v.id ORDER BY v_count DESC LIMIT 10;

-- 6. Список таких даних: 
-- channel (user) name, channel (user) avatar, channel photo, channel description, subscription level, 
-- subscription date, взятий з підписок користувача Ennis Haestier,
-- із сортуванням, по-перше, за рівнем підписки (порядок рівнів підписки зверху вниз:
-- vip, follower, fan, standard), і по-друге, за датою підписки від новішої до старішої.
SELECT u.name, u.avatar_url, ch.photo_url, ch.description, s.level, s.subscribed_at FROM channels ch
JOIN users u ON u.id = ch.user_id
JOIN subscriptions s ON s.user_id = u.id
WHERE u.name LIKE 'Ennis Haestier'
ORDER BY
    CASE
       WHEN s.level = 'vip' THEN 1
	   WHEN s.level = 'follower' THEN 2
	   WHEN s.level = 'fan' THEN 3
	   WHEN s.level = 'standard' THEN 4
       ELSE 5
    END,
    s.subscribed_at DESC;