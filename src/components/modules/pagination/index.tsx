'use client';

import ReactPaginate from 'react-paginate';
import { memo, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  pagesCount?: number;
};

// ---------------------------------

export const CustomPagination = memo(function CustomPagination(
  props: Props,
) {
  const { pagesCount } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get('page')) || 1,
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  }, [pageNumber, pathname, router, searchParams]);

  return (
    <ReactPaginate
      forcePage={pageNumber - 1}
      pageCount={pagesCount || 1}
      containerClassName="flex flex-wrap gap-x-2 gap-y-4"
      activeClassName="bg-blue-500 text-white"
      pageClassName="w-8 h-8 flex justify-center items-center cursor-pointer border overflow-hidden transition-all rounded-md hover:bg-blue-300"
      pageLinkClassName="full-size text-[0.8rem] font-semibold pt-1 flex justify-center items-center"
      disabledClassName="opacity-50"
      onPageChange={(page) => setPageNumber(page.selected + 1)}
      previousLabel={
        <button className="flex justify-center items-center ml-1 h-8 w-8 cursor-pointer rounded-md border transition-colors hover:bg-blue-300">
          <ArrowRight size={16} />
        </button>
      }
      nextLabel={
        <button className="flex justify-center items-center mr-1 h-8 w-8 cursor-pointer rounded-md border transition-colors hover:bg-blue-300">
          <ArrowLeft size={16} />
        </button>
      }
    />
  );
});

