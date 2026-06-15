// features/employees/components/EmployeeForm/OfficialDetails.jsx
import React, { useEffect } from "react";
import { Grid, TextField } from "@mui/material";
import DebouncedSelect from "../../../../components/common/form/DebouncedSelect";
import {
    DESIGNATION_OPTIONS,
    DEPARTMENT_OPTIONS,
} from "../../constants/employeeConstants";
import { useAuth } from "../../../auth/hooks/useAuth";

const OfficialDetails = ({ formik, employeeId, mode = "create" }) => {
    const { user } = useAuth();

    // Set reporting_manager_id automatically to the vendor's user ID
    useEffect(() => {
        if (user?.id) {
            formik.setFieldValue("reporting_manager_id", user.id);
        }
    }, [user, formik]);

    // Simple onChange handlers - matching client form pattern
    const handleDesignationChange = (value) => {
        formik.setFieldValue("designation", value);
        // Formik will automatically validate on change
    };

    const handleDepartmentChange = (value) => {
        formik.setFieldValue("department", value);
        // Formik will automatically validate on change
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <DebouncedSelect
                    name="designation"
                    label="Designation"
                    placeholder="Select Designation"
                    value={formik.values.designation || ""} // Direct formik value, no transformation
                    onChange={handleDesignationChange}
                    onBlur={formik.handleBlur}
                    options={DESIGNATION_OPTIONS}
                    fullWidth
                    size="medium"
                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                    helperText={formik.touched.designation && formik.errors.designation}
                    required
                />
            </Grid>

            <Grid item xs={6}>
                <DebouncedSelect
                    name="department"
                    label="Department"
                    placeholder="Select Department"
                    value={formik.values.department || ""} // Direct formik value, no transformation
                    onChange={handleDepartmentChange}
                    onBlur={formik.handleBlur}
                    options={DEPARTMENT_OPTIONS}
                    fullWidth
                    size="medium"
                    error={formik.touched.department && Boolean(formik.errors.department)}
                    helperText={formik.touched.department && formik.errors.department}
                    required
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    name="reporting_manager_name"
                    label="Reporting Manager"
                    value={user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : ""}
                    fullWidth
                    size="medium"
                    InputProps={{
                        readOnly: true,
                    }}
                    disabled
                />
            </Grid>
        </Grid>
    );
};

export default OfficialDetails;