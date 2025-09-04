const { initializeApp } = require("firebase/app");
const { collection, where, doc, setDoc, getDocs, addDoc, getFirestore, query, orderBy, limit, Timestamp } = require("firebase/firestore");


(async () => {
	const csv_data = `
MIT Media Lab,https://www.media.mit.edu/,mit_media_lab.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/rRsvfpCvx5-vWNIq3R91Xg/jxWRlwZ4mMqePNCG1bsKbGOXaDBoqR3MKsXUDCZCBucMvpfGyvY7bEbJnRhNBdEqXHyRfjHBNN2WZ0Oe-t389GtwdkdVy871G6KK2mtGUXe7aOlivVCmu7gVLmCkq0JgOsuNTio9MkJlggBWjYjbgg/fQh1EsXYrxiUOjwbgrX4kNanzYpmEW1byI1FMIhQqdo),15,👌,checked,Marc Vilella,Aurora Crespo
Centre for Genomic Regulation,https://www.crg.eu/,crg.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/qfD4gor0rGa20pZ2F3EmEw/a-iDbgu3J3J265AWgjUCsB9m0znZXcspM6i3Q8r4Gz4-1nF0g5x-uFZ3QWCMae3_74wlU4uRJzIasCO9SI5c6bdnescdUp8REZHqdTadpY8NO6LZAH6dOWc5KEwPWCfRE-Pcduw_Gr_DSKjuC-FfIg/UfTlChOESCdyqs32yjnwv79hURg79DlhcdTcogBakRE),14,👌,checked,Marc Vilella,Aurora Crespo
Israel Innovation Institute,https://www.israelinnovation.org.il/,israel_innovation_institute.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/Janu7YWaE9vnDzDiQq42XA/Vw831dAS2zYoTGUUeGkBsHpS4EKcmzlHxbmG9cdkz29Kd1ZCg-I_aLIG2sPBIKDziSyskBQV1KrvjWw81EYhdojFbYZZ46aavvGU1xebgi23y1tvh-4GUqdEaJjT916sjfVLDZ1cWuPCaAoxeun4yg79IEqsdO_-wn74e_1ME9s/VNSpmzA1fwKtyvp0py8V2p7EMaQQBaGcdboVhkNykL4),2,👌,,Marc Vilella,Aurora Crespo
Leitat Technological Center,https://www.leitat.org/,leitat.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/2qfzVo3z7e_n0_5Qyk7khw/O_oZaTmp7WfduUpionrKCBS77dGLI3k-b3J0aRlUHsBUE8rg28qKjkmoa418IjF1DAdAfZ2f9j6E_vk-2mgFbtD8f1nRRDnD5aKJXjJkvuZKhxn9cQ9bzO5pzJ-FFRLow7vurjGJWM2qVL1RjbWjgA/w-yxjkCZIMTT_dN5lrweEoZTuLoPF1BxilGTC4Tx1Ck),3,👌,checked,Marc Vilella,Marc Vilella
Richi Entrepreneurs,https://richientrepreneurs.org/,richi_entrepreneurs (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/Ic_UM4TIqhCpt9XwA1L2cQ/zNpHvgrwm6_L84Phs_o-yB1P7oVQzoSVuQoo0q5DKIqHZbAAULDp67A0xJxwuI8RM6WjO3TuTTN6EiglgMgOfNhu9xstTp6z8kQav6uCT1i7GCvefqck_I1Tdv-RlXt3720AZ6MUW9gGiNgq8Ncbgw/PmfMiuHeCUeWwudwWz8xDuGFU6SOISqhxESASs0-308),4,👌,checked,Marc Vilella,Marc Vilella
Andorra Business,https://www.andorrabusiness.com/,logo-andorra-business.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/2gFrpmILtL_dD3NxQyd7zQ/EyYHlC_iSVs3XzXbb4zbDXwHakpPg7_Kt9E8LfF1x7ihGvp81nI5sFxnVs6nPR3kBEO1B2vLWJX9OE7jx7YA0VhziFZHuMHrY-u3-BRGynJ7qq7nJuuvPBgQPbcjFZFYNvINCNCWqeDdfa02fvBfypaggja80Vqqf_8PqMvMioM/8Rq-pUA7pGHZGCpSSvqjPs3yF8NXvuCsS7GdsQkqago),5,👌,,Marc Vilella,Aurora Crespo
Scale Lab Andorra,https://scalelabandorra.com/,Creand CA LVerde FBlanco RGB.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/e7gDiee03mKADn8kDIZA-g/SE4I6HgA8vL_KyuS_32bWBB5a5kI547TgueH4LFVVshsqfYd_3Q8PCHwzePG35zPAZt-k8ncp50ov_nE8Vg_Wbf_2NBHHIs3opaZQIfZuX120YkVOsW1veT_7wZbWhCzIX7VlfvgAjzircY4QegaIU6gn6oSzYCPW7R4RRAf9XtPiq0uE6RJkCMblZ-AGT3P/AzWYNb6GQHsZzyMhMbhTPo-eI_etWg98UzQgWXhIjgw),5,👌,checked,Marc Vilella,Aurora Crespo
La Salle,https://www.salleurl.edu/es,la_salle.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/8QIMcWqIsBrEHyshGxaNnw/R1m96L2A_ruz6ABzfNcZL8mZRFC6ODkTGT_dte-z0qZa_-wZ1MFiroTrFCTmb1K7VhpqXRUyqSR99szYOTdBqQR1eUIQnMlVQbMVvXarIzu9FGdzFjiAdiPzyU4MKdHJu1aZcyrLNGOpdL1kYmCjfg/mH_rTEN44mnD_x-SX9p-soOlu5aWyHy2ModlpM3zq1k),6,👌,,Aurora Crespo,Aurora Crespo
Aimsun,https://aimsun.com/,Aimsun_Horizontal_logo_RGB.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/4gYtnOATKNiY896PcE6oEg/XWHZBQGI6rup73Wi2xdboDqmvJsaZn3wt0sVVTM_Gs_BFd0QtK1lZg4ALzwqYUWzyTrLzGdUmgdZ8ZjrXCBpC5plDj5ylg7QKUFJW4iq2dgPcMk_INoNPIKk10aMvTVbXbz7mZjCDcUWoQkS57Q1wO7saPshu17hNpTtry7k_Po/KLv24TkIX47htMR7dsierqRFW91yh_QqjWatdA8edG4),7,👌,checked,Marc Vilella,Marc Vilella
Barcelona Tech City,https://techbarcelona.com/,barcelona_tech (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/LPx_IABUU9611jfsO57MZQ/i7j008IqR-9N7MmMGDr3Vbmo047AslQCSVaf3GQJuPNkzKAs4FP7jEoyaeHV4ggzVRoOQs6qCxvmqlmTSiO23eOKhwik752CfquFeFRt3vgd4GXS_C5WSv6NBe-JoFMv3lDwzRKQ27KvllOWTUcIgg/q_Fg-oSUueq8m0uVDYp8JukLWDMTMHbOUdAZeEmxA3A),8,👌,,Marc Vilella,Aurora Crespo
La Mêlée,https://www.lamelee.com/,lamelee.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/qskZof5W0FaHK6bO3ddlKA/20Q7Pbzi3e35uvjn4tLYIUu6OZ21tC3G_DzIPVZpqqN0Q2bBan9HaYreIyv6mvh4Zz1RaJN3DQxWg4xN0t8sPwSgLemmiCozxc-LBAvce3-9a5cP9xDEonn_vcVN23vPxnovzu9empzJ7wKO-KRzSaRdZ_IxHMZfKY-vQa-i-aw/lJhBdF1KMU6PGwzWIJO4sf360b0OKwW6N6iP0NlmsT4),9,👌,,Marc Vilella,Aurora Crespo
InnoEnergy,https://www.innoenergy.com/,innoenergy.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/tL8ZeQ0iA-ltoM7cYZgc8Q/h7ElwuY7OR92R8Uh5d390uX323XpR-GJjfaW8Jm0r7ZOZiN8j6hkfEik1bcvAzXaqO_Nb01mgsa6IZ4YjbbewLes04KXyKpJcyivKCqpxeAbAJGvopd03fY808e134mWmIQ9OOzKcxzAlqQ2l9b29li89v--7CSXtzhOeEAvN4w/o4ykmV8piuxSjqAahhZsGLBUAp8gQc9g7CBTKVoVXaU),10,👌,checked,Marc Vilella,Marc Vilella
Barcelona Supercomputing Center,https://www.bsc.es/,bsc.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/eVsrLzAO_OnuZMd1V3DbIQ/b3qbzk-HpX3iIla4OlvVGFweZ5-tcrGxjrzEOElyq3-HkiiojJ8InVpqIGpRqvs1TwZ57qWCialNFD_0-_XRSwVQJxHTWUClwNbL0sJD8VQ5u8YJgTU8LJ00xRniCkYKZqFk2uIrBY0zoNgQ2ZBTyg/HLFxkdMt7RZrh-QH_Lb5-WoYJODVQ_1c0MsH0FQr6DQ),11,👌,checked,Marc Vilella,Marc Vilella
VISA,https://www.visa.com,visa(1).png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/8NjaeAOGGLv9Zu6bBdbmQA/GVKtXVwFA2l8eqPI-34K9HBUh4dqhiXbnLJOq50T6M3tpfIkIr54Y31toyte8NrOIT03i7CSi-8-dTs460FsOEJF9TNNM3oMdBUxS5AQHDOsWez36idX7zRZ_pdzFQ5J2PNUxxSMuBYM87NbEuFe7Q/vH0Bg23NHbVMeRoMiDvh2ezyLsOWePvja73ymoqKkP4),11,👌,,Marc Vilella,Aurora Crespo
Actinn,https://www.actinn.ad/,actinn.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/QSZBQHXsn66L08UmofVJbg/h_yq-AbAbJwz-7zXEapG0R3k-ejSB0NmeIULASjtwfW5S8goVqCVqiEsYpZu6tdSypygywlN32WAud_XxK-WdXqfxTTMhtpThdp-ySree2Dj_b-ziSTjb38gfOc6WruQwGpOouFBqZyaGdNUMdr0aUy7251mnUQWHm1r0D3dZn5OIAuDO2CObvACfQm6PoryMMCbEAv6pThr70e1TkkJOwrtmsBFihqmKWMlPMUzsSg/fDiAt3HT-5JeDiPY9Sl5x05tqihEiKRGBhQuB8yyCys),12,👌,checked,Marc Vilella,Aurora Crespo
Malaga TechPark,https://www.pta.es,logo-Malaga-Tech-Park-600x300.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/Lb3JDbxneXMX9NsHAYJLcw/ETQj0Sq9YDxU-rMzptQ_Xa__bOVZDlvxWB7KRsunbt7YRVU_QIyI_eljrWj493gMd3b0asakPgijOe4rqhPvUKKE_n8slQlTMVpbyvcQg3o98BjFhl7qwUKRk-2EYNqldJ1s2LKT4vTG20I9gL4MOrFmfZ4pwNd7l-T_uOCnV1I/x6TuahbA7inW2I0wc5njwPtRVmnftsZM9uyiEaGVh3I),13,👌,checked,Aurora Crespo,Aurora Crespo
GSIC,https://sport-gsic.com,Logo-GSIC-Transparente-1024x553(1).png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/_34VbKTdxPRekVE4INGphA/7TiM9P5rsKPcUTELrdBUVFcUenrS73jz-dGX1nl58tPfSEk9WWQrYOBcrKXYflwiTqVtXK_ZJtFpLNBWEeknITLD2JHqdzpDrtMWM0nyEkw0RUoidk58GSA-y63xgadeFhYK2RRSU1c8q8CChAtUkoNqtMhjiAVp93626tdoE54/yt0Bk7kg2HWyaD_Wj8fR3M3PWfiUN5jI1bA6FGzH42s),16,👌,checked,Aurora Crespo,Marc Vilella
ISGLOBAL,https://www.isglobal.org,663-6638551_isglobal-historia-del-tratamiento-de-la-malaria-logo-removebg-preview.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/pITQ4RXZGd4i6WltokgJ9w/uG7qG-ap3mTn5rsdZdVid8YfrNUg1RGPlbcJuQDIei_pS6ZaZsU_JQzojb3JX6wAoJ7LrPzZbD-2Kp9kqL3HFyKRuCAA_nbzEHNlsd98gpu6jQqjMb1X3eB7sGbURVRoKQBskihxpunAZAUZOaqMsm6qd3M0nWpYDZlB97IwXP_9QqU8WfdAw3M-jsKWtY8B3gmv6322GjNi3RmmoDANWl1H8bOFhti3vWtT70HjLOSTsBd54wUotglgpglgVZlS/4FoA1BUrBR_FhQVhKxh-CNamnuC65_8l_I7-de-jv_U),17,👌,checked,Aurora Crespo,Marc Vilella
ENOLL,https://enoll.org,ENoLL-logo.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/sbHeiv9krMNhWjQaWY7C8w/9H-neWcb9eWIxOOUWv2KVDLeRbwaK0kn4iNZ0kf1pOTYLF_47CL1BFlvVRaiK_MoKPptf7kTNXRGhFTwtypmCdgDdXC1W3rGV21k3Jd3R0SFQnkpZ-bFDs8HGJTUTqgu4RiXPw5ad1uv9X64vqgwJw/Wl698R1jaa_xdGlC-vAP1wdzK_bk_PfjsSNAFkeEKSI),1,👌,checked,Aurora Crespo,Aurora Crespo
Eurecat,https://eurecat.org,800358_logo_angles_degradat_ajust_optic_A3.png (https://v5.airtableusercontent.com/v3/u/44/44/1756728000000/STh4JIDYjwXsSvzhhciCEA/r8FAK9KOHjLxaV-nSMOwcxMnk_CceFg8i4hgn8e_18CMZUvcCpjEyiYWgIOtg_B33F9aP-qtPpSejKEAKpFUo9-uIAZVg2Zcz-OR5MFa4ZR-WnaDYyWn-gsRI8o49PDS9R9CJpq0W2ddr1AmlA0o33YpFt3gcVrOmNxqhbH_wy-VfFfPJCDA1M7xZu5pjDh7/m1isAt2Z1WlhHq2L1DuT_2Z1kKlpjYjPFSrvfnC_BCA),0,👌,checked,Aurora Crespo,Aurora Crespo
	`;
	const partners_data = [
		{
			name: 'MIT Media Lab',
			web: 'https://www.media.mit.edu/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/mit_media_lab_42152DF6-7FB2-4446-82FC-D3C1FF177666.png',
			order: 15,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'Centre for Genomic Regulation',
			web: 'https://www.crg.eu/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/crg_7E52BC64-1095-4C24-8EC0-A80404353554.png',
			order: 14,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'Israel Innovation Institute',
			web: 'https://www.israelinnovation.org.il/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/israel_innovation_institute_529AA3C3-385F-4DB8-9D3C-394EAB8E4228.png',
			order: 2,
			active: false,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'Leitat Technological Center',
			web: 'https://www.leitat.org/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/leitat_4B491B6E-A331-4B20-AA9F-BBE4C5BF36A4.png',
			order: 3,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Marc Vilella'
		},
		{
			name: 'Richi Entrepreneurs',
			web: 'https://richientrepreneurs.org/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/richi_entrepreneurs_C7E120CB-59F6-4EE5-8006-6126F76DB573.png',
			order: 4,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Marc Vilella'
		},
		{
			name: 'Andorra Business',
			web: 'https://www.andorrabusiness.com/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/logo-andorra-businessDE9FDC9C-9BF8-4E28-AD35-91C49A135731.png',
			order: 5,
			active: false,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'Scale Lab Andorra',
			web: 'https://scalelabandorra.com/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/creand_F678DC5F-7151-420F-83E9-FF0F52596EA3.png',
			order: 5,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'La Salle',
			web: 'https://www.salleurl.edu/es',
			logo: 'gs://andorra-living-lab-website/public_images/partners/la_salle_39F68F42-1620-4FE7-9FD5-244B7BA8A56A.png',
			order: 6,
			active: false,
			created_by: 'Aurora Crespo',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'Aimsun',
			web: 'https://aimsun.com/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/aimsun_CE3A6F77-B746-47C5-9B2F-5262C83C6DE9.png',
			order: 7,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Marc Vilella'
		},
		{
			name: 'Barcelona Tech City',
			web: 'https://techbarcelona.com/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/barcelona_tech_D1DBDBFB-8750-4CD4-9F8D-5A878058697E.png',
			order: 8,
			active: false,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'La Mêlée',
			web: 'https://www.lamelee.com/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/lamelee_D2540D77-8A0A-423C-B1CE-D2B59C4A44F3.png',
			order: 9,
			active: false,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'InnoEnergy',
			web: 'https://www.innoenergy.com/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/innoenergy_C91B1A5B-E188-4BB9-84A5-2BC711DA014A.png',
			order: 10,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Marc Vilella'
		},
		{
			name: 'Barcelona Supercomputing Center',
			web: 'https://www.bsc.es/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/bsc_6E507764-3EB2-4C66-A596-BB3EE7127924.png',
			order: 11,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Marc Vilella'
		},
		{
			name: 'VISA',
			web: 'https://www.visa.com',
			logo: 'gs://andorra-living-lab-website/public_images/partners/visa_80D67F03-D4D2-481B-9055-D0D291F20B2B.png',
			order: 11,
			active: false,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'Actinn',
			web: 'https://www.actinn.ad/',
			logo: 'gs://andorra-living-lab-website/public_images/partners/actinn_64E58A0B-6677-4B4F-A57A-BCF6D77B4BB8.png',
			order: 12,
			active: true,
			created_by: 'Marc Vilella',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'Malaga TechPark',
			web: 'https://www.pta.es',
			logo: 'gs://andorra-living-lab-website/public_images/partners/malaga_tech_A5CF0EC5-1FC1-48E7-BB9B-27BC120FF56F.png',
			order: 13,
			active: true,
			created_by: 'Aurora Crespo',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'GSIC',
			web: 'https://sport-gsic.com',
			logo: 'gs://andorra-living-lab-website/public_images/partners/GSIC_FA43C52D-D858-4E10-BEDB-3973FAF08FF9.png',
			order: 16,
			active: true,
			created_by: 'Aurora Crespo',
			updated_by: 'Marc Vilella'
		},
		{
			name: 'ISGLOBAL',
			web: 'https://www.isglobal.org',
			logo: 'gs://andorra-living-lab-website/public_images/partners/663-6638551_isglobal-historia-del-tratamiento-de-la-malaria-logo-removebg-preview.png',
			order: 17,
			active: true,
			created_by: 'Aurora Crespo',
			updated_by: 'Marc Vilella'
		},
		{
			name: 'ENOLL',
			web: 'https://enoll.org',
			logo: 'gs://andorra-living-lab-website/public_images/partners/ENoLL_DE27385A-7302-4823-BADC-0180E275230B.png',
			order: 1,
			active: true,
			created_by: 'Aurora Crespo',
			updated_by: 'Aurora Crespo'
		},
		{
			name: 'Eurecat',
			web: 'https://eurecat.org',
			logo: 'gs://andorra-living-lab-website/public_images/partners/eurecat_83578F12-601A-42A4-B263-15D8B15745BC.png',
			order: 0,
			active: true,
			created_by: 'Aurora Crespo',
			updated_by: 'Aurora Crespo'
		}
	]

	const firebaseConfig = {
		apiKey: "AIzaSyCzv-_1rX******************",
		authDomain: "andorra-recerca-innovacio.firebaseapp.com",
		projectId: "andorra-recerca-innovacio",
		storageBucket: "andorra-recerca-innovacio.firebasestorage.app",
		messagingSenderId: "525381711910",
		appId: "1:525381711910:web:001c8c29671392ce8f8ee7"
	};

	const app = initializeApp(firebaseConfig);

	const db = getFirestore(app, 'andorra-living-lab-website')

	const projectsRef = collection(db, "challenges");

	const q = query(projectsRef, where("active", "==", true))
	const projectsData = await getDocs(q);

	console.dir(projectsData.map(e => e.data()), {depth: null})

	//const querySnapshot = await getDocs(q)
	const __data = [];
	for (const csv_row of csv_data.split('\n').filter((e) => e.length > 2)) {
		const [_name, _web, _logo, _order, _allok, _active, _created_by, _updated_by] = csv_row.split(',');
		__data.push({
			name: _name,
			web: _web,
			logo: '',
			order: parseInt(_order),
			active: _active === 'checked',
			created_by: _created_by,
			updated_by: _updated_by,
		})
	}

	for (const partner_data of partners_data) {
		const docRef = await addDoc(collection(db, "partners"), partner_data);
		console.log("Document written with ID: ", docRef.id);
	}


	process.exit();
})()
