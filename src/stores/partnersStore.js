import { defineStore } from "pinia";
import { db } from '/@/firebase'
import { collection, query, where, orderBy, getDocs } from "@firebase/firestore";
import { localizeFields, replaceGsUrlsWithPublicUrlsAsync } from '/@/helpers'

export const usePartnersStore = defineStore('partners', {
    state: () => ({
        partners: [],
        loading: false,
    }),

    actions: {
        async getAllPartners() {
            this.loading = true;

            try {
                const q = query(
                    collection(db, "partners"),
                    where("active", "==", true),
                    orderBy("order", "asc"),
                );
                const snapshot = await getDocs(q);

                const localizedFields = [];
                const gsFields = ['logo'];

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

                this.partners = results;
            } catch (err) {
                console.error("Failed to fetch partners:", err);
            } finally {
                this.loading = false;
            }
        }
    }
})