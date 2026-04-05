import { useState, useCallback } from 'react';
import { z } from 'zod';
import type { ProductFormData } from 'types/formData';

export function useForm({
    initialData,
    schema,
    onSubmit
}: {
    initialData: ProductFormData;
    schema: z.ZodSchema<ProductFormData>;
    onSubmit: (data: ProductFormData) => void | Promise<void>;
}) {
    const [form, setForm] = useState<ProductFormData>(initialData);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = useCallback((field: string, value: any) => {
        if (field === 'category' && !value) return;

        if (field === 'price' && value.toString() === 'NaN') return;

        setForm(prev => ({ ...prev, [field]: value }));
        
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    }, [errors]);

    const handleNestedChange = useCallback((field: string, value: any) => {
        const numberKeys = [
            'yearOfManufacture', 'mileage', 'enginePower',
            'area', 'floor'
        ];
        
        let finalValue: any = value;
        
        if (numberKeys.includes(field)) {
            if (value === '') {
                finalValue = undefined;
            } else {
                const num = Number(value);
                finalValue = isNaN(num) ? undefined : num;
            }
        }

        setForm(prev => ({
            ...prev,
            'params': {
                ...(prev['params'] as any),
                [field]: finalValue
            }
        }));
        
        const errorKey = `${'params'}.${field}`;
        if (errors[errorKey]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[errorKey];
                return newErrors;
            });
        }
    }, [errors]);

    const handleSubmit = useCallback(async () => {
        const result = schema.safeParse(form);
        
        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.issues.forEach(err => {
                newErrors[err.path.join('.')] = err.message;
            });
            setErrors(newErrors);
            return;
        }
        
        setErrors({});
        await onSubmit(result.data);
    }, [form, schema, onSubmit]);

    return {
        form,
        setForm,
        errors,
        handleChange,
        handleNestedChange,
        handleSubmit,
        isValid: Object.keys(errors).length === 0
    };
}
