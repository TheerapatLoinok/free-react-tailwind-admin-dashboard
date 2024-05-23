import { getEmbed, updateEmbed } from '../api/chatbot';
import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { BsPencilSquare } from 'react-icons/bs';
import Modal from '../common/Modal';
import { toast } from 'react-toastify';

type EmbedType = {
  id: number;
  messageContext: string;
};

function PreviewData() {
  const [embed, setEmbed] = useState<EmbedType[]>([]);
  const [selectedEmbed, setSelectedEmbed] = useState<EmbedType>();
  const [isOpen, setIsOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const getEmbedData = async () => {
    try {
      const data = (await getEmbed()) as any;
      setEmbed(data);
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleUpdateEmbed = async () => {
    try {
      if (!selectedEmbed) return;
      if (selectedEmbed?.messageContext.trim() === '') {
        toast.error('Embed cannot be empty.', { position: 'bottom-left' });
        return;
      }

      const payload = {
        content: selectedEmbed?.messageContext,
      };
      await updateEmbed(selectedEmbed?.id, payload);
      toast.success('Save embed successfully', { position: 'bottom-left' });
      setIsChange(false);
      setIsOpen(false);
      getEmbedData();
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleSelectedEmbed = (embed: EmbedType) => {
    setSelectedEmbed(embed);
    setIsOpen(true);
  };
  const handleChangeValue = (value: string) => {
    setSelectedEmbed((prevSelectedEmbed) => {
      if (!prevSelectedEmbed) return prevSelectedEmbed;
      return {
        ...prevSelectedEmbed,
        messageContext: value,
      };
    });
    setIsChange(true);
  };
  useEffect(() => {
    getEmbedData();
  }, []);

  return (
    <>
      <Breadcrumb
        mainPageName="Setting"
        mainPagePath="/settings/uploadfiles"
        pageName="Preview Data"
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h3 className="text-xl mb-3 font-semibold text-black">Preview data</h3>
        <p>Show data that has been uploaded and converted to embedded.</p>
        <div className="h-[600px] w-full border-[1px] border-stroke rounded-lg my-4 flex flex-col gap-4 p-4 overflow-hidden overflow-y-scroll">
          {embed.length > 0 ? (
            <>
              {embed.map((em) => (
                <div
                  key={em.id}
                  className="bg-stroke bg-opacity-40 rounded-md relative"
                >
                  <p className="px-4 pt-10 pb-4">{em.messageContext}</p>
                  <BsPencilSquare
                    className="absolute right-4 top-4 cursor-pointer hover:text-danger"
                    onClick={() => handleSelectedEmbed(em)}
                  />
                </div>
              ))}
            </>
          ) : (
            <p className="self-center items-center text-sm text-opacity-70 mt-10">
              There is no embed data at this time.
            </p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false), setIsChange(false);
        }}
      >
        <div className="w-[700px] h-[400px] flex flex-col gap-4">
          <textarea
            className="w-full h-full p-4 resize-none mt-4 focus:ring-0 focus:outline-none border-[1px] border-stroke rounded-md"
            value={selectedEmbed?.messageContext}
            onChange={(e) => handleChangeValue(e.target.value)}
          />
          <button
            disabled={!isChange}
            onClick={handleUpdateEmbed}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 disabled:bg-body"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}

export default PreviewData;
