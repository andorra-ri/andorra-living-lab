import { defineStore } from "pinia";
import { db } from '/@/firebase'
import { collection, query, where, limit, orderBy, getDocs } from "@firebase/firestore";
import { localizeFields, replaceGsUrlsWithPublicUrlsAsync } from '/@/helpers'

export const useChallengesStore = defineStore('challenges', {
    state: () => ({
        challenges: [],
        challenge: null,
        loading: false,
    }),

    actions: {
        async getAllChallenges() {
            this.loading = true;

            try {
                const q = query(
                    collection(db, "challenges"),
                    where("active", "==", true),
                    orderBy("date_start", "desc"),
                    orderBy("order", "desc"),
                );
                const snapshot = await getDocs(q);

                const localizedFields = ['name'];
                const gsFields = ['cover', 'partners', 'bases'];

                const results = [];

                for (const doc of snapshot.docs) {
                     const raw = doc.data();

                     const localizedData = localizeFields(raw, localizedFields);

                     const resolvedMedia = await replaceGsUrlsWithPublicUrlsAsync(localizedData, gsFields);

                     results.push({
                        id: doc.id,
                        ...resolvedMedia
                    });
                }

                this.challenges = results;
            } catch (err) {
                console.error("Failed to fetch challenges:", err);
            } finally {
                this.loading = false;
            }
        },

        async getChallenge(slug) {
            this.loading = true;
            this.challenge = null;

            try {
                const q = query(
                    collection(db, "challenges"),
                    where("slug", "==", slug),
                    where("active", "==", true),
                    limit(1)
                );

                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    console.warn(`Challenge with slug "${slug}" not found.`);
                    return null;
                }

                const doc = snapshot.docs[0];
                const raw = doc.data();

                const localizedFields = ['name', 'description'];
                const gsFields = ['cover', 'partners', 'bases'];
                const localizedData = localizeFields(raw, localizedFields);
                const resolvedMedia = await replaceGsUrlsWithPublicUrlsAsync(localizedData, gsFields);

                const challenge = {
                    id: doc.id,
                    ...resolvedMedia
                };

                this.challenge = challenge;

                return challenge;

            } catch (err) {
                console.error("Failed to fetch challenge:", err);
                return null;
            } finally {
                this.loading = false;
            }
        },
    }
})