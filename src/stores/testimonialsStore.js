import { defineStore } from "pinia";
import { db } from '/@/firebase'
import { collection, query, where, orderBy, getDocs } from "@firebase/firestore";
import { localizeFields, replaceGsUrlsWithPublicUrlsAsync } from '/@/helpers'

export const useTestimonialsStore = defineStore('testimonials', {
    state: () => ({
        testimonials: [],
        loading: false,
    }),

    actions: {
        async getAllTestimonials() {
            this.loading = true;

            try {
                const q = query(
                    collection(db, "testimonials"),
                    where("active", "==", true),
                    orderBy("order", "asc"),
                );
                const snapshot = await getDocs(q);

                const localizedFields = ['testimonial'];
                const gsFields = ['photo'];

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

                this.testimonials = results;
            } catch (err) {
                console.error("Failed to fetch testimonials:", err);
            } finally {
                this.loading = false;
            }
        }
    }
})