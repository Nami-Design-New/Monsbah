import { useMemo } from 'react';
import { PAGE_TYPES, USER_TYPES } from '../../constants/categories';

export default function useCategoryList(page, categories, companyCategories) {
  const categoryList = useMemo(() => {
    // If on companies page, always show company categories
    if (page === PAGE_TYPES.COMPANIES) {
      return companyCategories || [];
    }

    // Otherwise check localStorage
    const userType = localStorage.getItem("userType");
    return (userType === USER_TYPES.CLIENT ? categories : companyCategories) || [];
  }, [page, categories, companyCategories]);

  return { categoryList };
} 