import { PlusIcon } from "@heroicons/react/24/solid";

export default function Root() {
  return (
    <div className="px-4 py-6 sm:px-6 md:px-8 lg:px-10">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">
        Tạo hệ thống quản lý mới
      </h1>
      <div className="flex items-center justify-center rounded-[10px] bg-indigo-100 p-4 hover:bg-indigo-200 cursor-pointer transition-colors">
        <PlusIcon className="w-6 h-6 text-indigo-700 mr-2" />
        <span className="text-indigo-700 font-medium">Tạo mới</span>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-indigo-700 mt-4">
        Các hệ thống quản lý hiện có
      </h1>
      <div className="flex justify-center">
        <h1 className="text-1xl font-bold mb-4 mt-4 text-gray-500 italic text-center max-w-3xl">
          Bạn chưa có hệ thống quản lý nào. Hãy tạo mới để thuận tiện cho việc
          quản lý dự án của mình.
        </h1>
      </div>
    </div>
  );
}
