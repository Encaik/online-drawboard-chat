import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export function Chat({ client }: { client: Socket | null }) {
  let [msgList, setMsgList] = useState<string[]>([]);
  let input: HTMLInputElement | null;

  useEffect(() => {
    client?.on("message", (msg) => {
      setMsgList([...msgList, msg])
    });
    return () => {
      client?.off("message")
    }
  }, [client, msgList])

  function onSendClick() {
    let value = input?.value;
    if(value){
      client?.emit("message", value)
      setMsgList([...msgList, value])
      if(input)input.value="";
    }
  }

  return (
    <>
      <div className="p-4 h-full flex flex-col gap-2">
        <div className="flex-1 bg-white rounded">
          {
            msgList.map((msg, index) => {
              return (
                <div key={index}>{msg}</div>
              )
            })
          }
        </div>
        <div className="flex-none h-10 flex gap-2">
          <div className="flex-1">
            <input type="text" ref={i => input = i} className="appearance-none rounded h-full w-full" />
          </div>
          <div className="flex-none w-10">
            <input type="button" value="发送" className="appearance-none rounded h-full w-full bg-sky-400 cursor-pointer text-white" onClick={onSendClick} />
          </div>
        </div>
      </div>
    </>
  )
}