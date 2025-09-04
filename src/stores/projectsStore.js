import { defineStore } from "pinia";
import { db } from '/@/firebase'
import { collection, query, where, orderBy, getDocs } from "@firebase/firestore";
import { localizeFields, replaceGsUrlsWithPublicUrlsAsync } from '/@/helpers'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
        project: null,
        loading: false,
    }),

    actions: {
        async getAllProjects() {
            this.loading = true;

            try {
                const q = query(
                    collection(db, "projects"),
                    where("active", "==", true),
                    orderBy("order", "asc"),
                );
                const snapshot = await getDocs(q);

                const localizedFields = ['name', 'abstract'];
                const gsFields = ['cover'];

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

                this.projects = results;
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            } finally {
                this.loading = false;
            }
        },

        async getProject(slug) {
            this.loading = true;
            this.project = null;

            try {
                const q = query(
                    collection(db, "projects"),
                    where("slug", "==", slug),
                    where("active", "==", true),
                    limit(1)
                );

                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    console.warn(`Project with slug "${slug}" not found.`);
                    return null;
                }

                const doc = snapshot.docs[0];
                const raw = doc.data();

                const localizedFields = ['name', 'description'];
                const gsFields = ['cover'];
                const localizedData = localizeFields(raw, localizedFields);
                const resolvedMedia = await replaceGsUrlsWithPublicUrlsAsync(localizedData, gsFields);

                const project = {
                    id: doc.id,
                    ...resolvedMedia
                };

                this.project = project;

                return project;

            } catch (err) {
                console.error("Failed to fetch project:", err);
                return null;
            } finally {
                this.loading = false;
            }
        },
    }
})