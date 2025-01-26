--data for table 'account'
INSERT INTO public.account (
		account_firstname,
		account_lastname,
		account_email,
		account_password
	)
VALUES (
		'Tony',
		'Stark',
		'tony@starkent.com',
		'Iam1ronM@n'
	);
--Update data  in table 'account'
UPDATE public.account
SET account_type = 'Admin'
WHERE account_id = 1;
--delete data from table 'account'
DELETE FROM public.account
WHERE account_id = 1;
--update data on table 'inventory'
UPDATE public.inventory
SET inv_description = REPLACE(
		inv_description,
		'small interiors',
		'a huge interior'
	)
WHERE inv_make = 'GM';
-- joining data on table 'inventory' that has same classification_id of 2
SELECT inv_make,
	inv_model
FROM public.inventory
	JOIN public.classification ON public.inventory.classification_id = public.classification.classification_id
WHERE public.inventory.classification_id = 2;
-- Update data on table 'inventory' to show /vehicle on the inv_image and inv_thumbnail
UPDATE public.inventory
SET inv_image = REPLACE(inv_image, '/image', '/image/vehicle'),
	inv_thumbnail = REPLACE (inv_thumbnail, '/image', '/image/vehicle');